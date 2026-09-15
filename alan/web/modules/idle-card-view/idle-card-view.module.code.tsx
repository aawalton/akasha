"use client"

import {
  cumulativeTrainCost,
  maxAffordableTrainCount,
} from "akasha/alan/harness/idle-system/modules/idle-accrual/idle-accrual.module.code.ts"
import { displayedResource } from "akasha/alan/harness/idle-system/modules/idle-rate/idle-rate.module.code.ts"
import { bucketPageRowsByGroup } from "akasha/alan/web/modules/idle-card-grouping/idle-card-grouping.module.code.ts"
import {
  IDLE_CARD_PROPERTY_DEFINITIONS,
  IDLE_LOCK_STATE_UNLOCKED,
  IDLE_PERSONA_CARD_ICON,
  IDLE_PERSONA_CARD_PAGE_TYPE_SLUG,
} from "akasha/alan/web/modules/idle-card-page-type/idle-card-page-type.module.code.ts"
import { deriveCardRows } from "akasha/alan/web/modules/idle-card-rows/idle-card-rows.module.code.ts"
import {
  ensureCatalogLoaded,
  getCatalogSnapshot,
  subscribeCatalog,
} from "akasha/alan/web/modules/idle-catalog-store/idle-catalog-store.module.code.ts"
import { idleGameStore } from "akasha/alan/web/modules/idle-game-store/idle-game-store.module.code.ts"
import { buildLineupViewConfig } from "akasha/alan/web/modules/idle-lineup-view-config/idle-lineup-view-config.module.code.ts"
import { buildRosterViewConfig } from "akasha/alan/web/modules/idle-roster-view-config/idle-roster-view-config.module.code.ts"
import { openRosterGallery } from "akasha/alan/web/modules/roster-gallery-store/roster-gallery-store.module.code.ts"
import type { GalleryCardSize } from "akasha/page/core/view/modules/gallery/gallery.module.code.ts"
import { resolveGalleryCardSize } from "akasha/page/core/view/modules/gallery/gallery.module.code.ts"
import { PageCardRenderer } from "akasha/page/ui/components/modules/page-card-renderer/page-card-renderer.module.code.tsx"
import { PageSystemTabContent } from "akasha/page/ui/components/modules/page-system-view/page-system-view.module.code.tsx"
import { useReorderViewWiring } from "akasha/page/ui/components/modules/use-reorder-view-wiring/use-reorder-view-wiring.module.code.ts"
import type { PageRow } from "akasha/page/ui/components/view-engine/modules/view-row/view-row.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useEffect, useMemo, useState, useSyncExternalStore } from "react"

const EMPTY_AGGREGATES: ReadonlyMap<string, Record<string, number | null>> = new Map()
const EMPTY_PLURAL_SLUGS: ReadonlyMap<string, string> = new Map()
const noHref = (): string => ""

const ROW_PAGE_TYPE_SLUG = toPageTypeSlug(IDLE_PERSONA_CARD_PAGE_TYPE_SLUG)

const LOCKED_GLYPH = "⚿"

function cardSlugOf(page: PageRow): string | undefined {
  const slug = page.cardSlug
  return typeof slug === "string" && slug !== "" ? slug : undefined
}

function unlocked(page: PageRow): boolean {
  return page.lockState === IDLE_LOCK_STATE_UNLOCKED
}

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
      renderItem={(page) => {
        const cardSlug = cardSlugOf(page)
        const open = unlocked(page)
        return (
          <PageCardRenderer
            page={page}
            properties={IDLE_CARD_PROPERTY_DEFINITIONS}
            visibleProperties={layout.visibleProperties}
            galleryCardSize={layout.galleryCardSize}
            galleryCoverSourceId={layout.galleryCoverSource}
            coverMaskGlyph={open ? null : LOCKED_GLYPH}
            onCoverClick={
              open && cardSlug !== undefined ? () => openRosterGallery(cardSlug) : undefined
            }
            rowPageTypeSlug={ROW_PAGE_TYPE_SLUG}
            rowAggregates={EMPTY_AGGREGATES}
            pageTypeIconName={IDLE_PERSONA_CARD_ICON}
            pageHrefById={noHref}
            pageTypePluralSlugById={EMPTY_PLURAL_SLUGS}
          />
        )
      }}
    />
  )
}
