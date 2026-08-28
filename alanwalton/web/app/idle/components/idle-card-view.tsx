"use client"

import type { GalleryCardSize } from "@shared/pages-core/view/gallery"
import { resolveGalleryCardSize } from "@shared/pages-core/view/gallery"
import { PageCardRenderer } from "@shared/pages-ui/components/page-card-renderer"
import { PageSystemTabContent } from "@shared/pages-ui/components/page-system-view"
import { useReorderViewWiring } from "@shared/pages-ui/components/use-reorder-view-wiring"
import { type PageRow } from "@shared/pages-ui/view-engine/page-row"
import { PageTypeSlug } from "@shared/pages-url"
import { useEffect, useMemo, useState, useSyncExternalStore } from "react"
import { cumulativeTrainCost, maxAffordableTrainCount } from "../lib/core/accrual.ts"
import { displayedResource } from "../lib/core/rate.ts"
import { bucketPageRowsByGroup } from "~/idle/lib/idle-card-grouping"
import {
  IDLE_CARD_PROPERTY_DEFINITIONS,
  IDLE_PERSONA_CARD_ICON,
  IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
  ROSTER_GALLERY_CAPABILITY,
} from "~/idle/lib/idle-card-page-type"
import { deriveCardRows } from "~/idle/lib/idle-card-rows"
import {
  ensureCatalogLoaded,
  getCatalogSnapshot,
  subscribeCatalog,
} from "~/idle/lib/idle-catalog-store"
import { idleGameStore } from "~/idle/lib/idle-game-store"
import { buildLineupViewConfig } from "~/idle/lib/idle-lineup-view-config"
import { buildRosterViewConfig } from "~/idle/lib/idle-roster-view-config"

const EMPTY_AGGREGATES: ReadonlyMap<string, Record<string, number | null>> = new Map()
const EMPTY_PLURAL_SLUGS: ReadonlyMap<string, string> = new Map()
const NO_HREF = (): string => ""

const ROW_PAGE_TYPE_SLUG = PageTypeSlug(IDLE_PERSONA_CARD_PAGE_TYPE_SLUG)

interface CardViewLayout {
  readonly visibleProperties: readonly string[]
  readonly galleryCoverSource: string
  readonly galleryCardSize: GalleryCardSize
  readonly filters:
    | readonly { readonly propertyId: string; readonly operator: string }[]
    | undefined
  readonly sorts:
    | readonly { readonly field: string; readonly direction: "asc" | "desc" }[]
    | undefined
  readonly reorder: { readonly verbId: string } | undefined
  readonly pageSize: number | undefined
  readonly defaultGroupBy: string
  readonly label: string
  readonly embedded: boolean
}

function buildCardViewLayout(view: "lineup" | "roster"): CardViewLayout {
  if (view === "lineup") {
    const c = buildLineupViewConfig(IDLE_PERSONA_CARD_PAGE_TYPE_SLUG)
    return {
      visibleProperties: c.visible_properties,
      galleryCoverSource: c.gallery_cover_source,
      galleryCardSize: resolveGalleryCardSize(c.gallery_card_size),
      filters: c.filters,
      sorts: c.sorts,
      reorder: c.reorder,
      pageSize: undefined,
      defaultGroupBy: "",
      label: "Team",
      embedded: true,
    }
  }
  const c = buildRosterViewConfig(IDLE_PERSONA_CARD_PAGE_TYPE_SLUG)
  return {
    visibleProperties: c.visible_properties,
    galleryCoverSource: c.gallery_cover_source,
    galleryCardSize: resolveGalleryCardSize(c.gallery_card_size),
    filters: undefined,
    sorts: undefined,
    reorder: undefined,
    pageSize: c.page_size,
    defaultGroupBy: c.group_by,
    label: "Roster",
    embedded: false,
  }
}

export function IdleCardView({ view, now }: { view: "lineup" | "roster"; now: number }) {
  const snap = useSyncExternalStore(
    idleGameStore.subscribe,
    idleGameStore.getSnapshot,
    idleGameStore.getSnapshot
  )
  const catalog = useSyncExternalStore(subscribeCatalog, getCatalogSnapshot, getCatalogSnapshot)

  useEffect(() => {
    ensureCatalogLoaded()
  }, [])

  const layout = useMemo(() => buildCardViewLayout(view), [view])

  const { onReorderCards } = useReorderViewWiring({
    reorder: layout.reorder,
    pageTypeSlug: IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
  })

  const state = snap.state
  const baseRows = useMemo<readonly PageRow[]>(
    () => (state !== null && catalog !== null ? deriveCardRows(state, catalog) : []),
    [state, catalog]
  )
  const liveResource = state !== null ? displayedResource(state, now) : 0
  const teammateBySlug = useMemo(
    () => new Map((state?.teammates ?? []).map((t) => [t.slug, t])),
    [state]
  )
  const rows = useMemo<readonly PageRow[]>(
    () =>
      baseRows.map((r) => {
        const teammate = typeof r._id === "string" ? teammateBySlug.get(r._id) : undefined
        const trainMaxCount =
          teammate === undefined ? 0 : maxAffordableTrainCount(teammate, liveResource)
        const trainMaxCost =
          teammate === undefined ? 0 : cumulativeTrainCost(teammate, trainMaxCount)
        return {
          ...r,
          train10Affordable: typeof r.train10Cost === "number" && liveResource >= r.train10Cost,
          trainMaxCount,
          trainMaxCost,
        }
      }),
    [baseRows, liveResource, teammateBySlug]
  )

  const [groupBy, setGroupBy] = useState(layout.defaultGroupBy)
  const serverGrouped = useMemo(
    () =>
      groupBy !== ""
        ? bucketPageRowsByGroup(rows, groupBy, IDLE_CARD_PROPERTY_DEFINITIONS)
        : undefined,
    [rows, groupBy]
  )

  if (state === null || catalog === null) return null

  return (
    <PageSystemTabContent
      embedded={layout.embedded}
      items={rows}
      label={layout.label}
      properties={IDLE_CARD_PROPERTY_DEFINITIONS}
      layout="gallery"
      visibleProperties={layout.visibleProperties}
      galleryCardSize={layout.galleryCardSize}
      galleryCoverSource={layout.galleryCoverSource}
      defaultFilters={layout.filters}
      defaultSorts={layout.sorts}
      defaultGroupBy={layout.defaultGroupBy}
      defaultPageSize={layout.pageSize}
      serverGrouped={serverGrouped}
      onConfigChange={(config) => setGroupBy(config.groupBy ?? "")}
      onReorderCards={onReorderCards}
      renderItem={(page) => (
        <PageCardRenderer
          page={page}
          properties={IDLE_CARD_PROPERTY_DEFINITIONS}
          visibleProperties={layout.visibleProperties}
          galleryCardSize={layout.galleryCardSize}
          galleryCoverSourceId={layout.galleryCoverSource}
          coverActionCapability={ROSTER_GALLERY_CAPABILITY}
          rowPageTypeSlug={ROW_PAGE_TYPE_SLUG}
          rowAggregates={EMPTY_AGGREGATES}
          pageTypeIconName={IDLE_PERSONA_CARD_ICON}
          pageHrefById={NO_HREF}
          pageTypePluralSlugById={EMPTY_PLURAL_SLUGS}
        />
      )}
    />
  )
}
