"use client"

import { type IconName } from "@shared/pages-core/icon"
import { type PageDataJSON } from "@shared/pages-core/types"
import { type GalleryCardSize, resolveGalleryCoverUrl } from "@shared/pages-core/view/gallery"
import type { PageTypeSlug } from "@shared/pages-url"
import { getCoverClickHandler } from "../cover-click/cover-click-registry.ts"
import { getCoverMask } from "../cover-click/cover-mask-registry.ts"
import type { PropertyDefinition } from "@shared/pages-core/types"
import type { PageRow } from "../view-engine/page-row.ts"
import { PageCard } from "./page-card.tsx"
import { PageCardNotes } from "./page-card-notes.tsx"
import { pageRowToPageDataJSON } from "./page-data-json.ts"
import { readRelationConfig } from "./page-system-view-helpers.tsx"
import { buildRelationBackLinkHref, buildRowHref } from "./view-tab-content-href.ts"

interface PageCardRendererProps {
  page: PageRow
  properties: readonly PropertyDefinition[]
  visibleProperties?: readonly string[]
  alwaysShowProperties?: readonly string[]
  rowPageTypeSlug?: PageTypeSlug
  rowAggregates: ReadonlyMap<string, Record<string, number | null>>
  pageTypeIconName: string | null
  pageHrefById: (id: string, opts?: { targetPageTypeId?: string }) => string
  pageTypePluralSlugById: ReadonlyMap<string, string>
  onIconChange?: (pageId: string, icon: IconName) => void
  onPropertyChange?: (
    pageId: string,
    propertyId: string,
    value: unknown,
    eventTimeStamp?: number
  ) => void
  onCompletedAtChange?: (pageId: string, value: unknown) => void
  onCreateOption?: (
    pageId: string,
    pageData: PageDataJSON,
    propertyId: string,
    label: string
  ) => void
  onDelete?: (pageId: string) => void
  onToggleFavorite?: (pageId: string, value: number | null) => void
  galleryCardSize?: GalleryCardSize
  galleryCoverSourceId?: string
  notesProperty?: PropertyDefinition
  coverActionCapability?: string
}

export function PageCardRenderer({
  page,
  properties,
  visibleProperties,
  alwaysShowProperties,
  rowPageTypeSlug,
  rowAggregates,
  pageTypeIconName,
  pageHrefById,
  pageTypePluralSlugById,
  onIconChange,
  onPropertyChange,
  onCompletedAtChange,
  onCreateOption,
  onDelete,
  onToggleFavorite,
  galleryCardSize,
  galleryCoverSourceId,
  notesProperty,
  coverActionCapability,
}: PageCardRendererProps) {
  const viewRowHref = buildRowHref(rowPageTypeSlug, page)
  const rowHref = viewRowHref !== "" ? viewRowHref : pageHrefById(page._id)
  const coverUrl =
    galleryCardSize != null && galleryCoverSourceId != null
      ? resolveGalleryCoverUrl(page[galleryCoverSourceId])
      : null
  const { _id, ...rest } = page
  const fill = rowAggregates.get(_id)
  const pageData = pageRowToPageDataJSON(fill ? { ...rest, ...fill } : rest)
  const coverHandler =
    coverActionCapability != null ? getCoverClickHandler(coverActionCapability) : undefined
  const onCoverClick =
    coverHandler != null && rowPageTypeSlug != null
      ? () => coverHandler({ pageId: _id, pageTypeSlug: rowPageTypeSlug, data: pageData })
      : undefined
  const coverMask = rowPageTypeSlug != null ? getCoverMask(rowPageTypeSlug) : undefined
  const coverMaskGlyph =
    coverMask != null && rowPageTypeSlug != null
      ? coverMask({ pageId: _id, pageTypeSlug: rowPageTypeSlug, data: pageData })
      : null
  const notesSlot =
    notesProperty != null && rowPageTypeSlug != null ? (
      <PageCardNotes
        pageId={_id}
        pageTypeSlug={rowPageTypeSlug}
        property={notesProperty}
        lightValue={page[notesProperty.id]}
        onNotesChange={(propertyId, value) => onPropertyChange?.(_id, propertyId, value)}
      />
    ) : undefined
  return (
    <PageCard
      id={_id}
      definitions={properties}
      data={pageData}
      pageTypeSlug={rowPageTypeSlug}
      visiblePropertyIds={visibleProperties}
      alwaysShowPropertyIds={alwaysShowProperties}
      coverSize={galleryCardSize}
      coverUrl={coverUrl}
      coverMaskGlyph={coverMaskGlyph}
      onCoverClick={onCoverClick}
      notesSlot={notesSlot}
      href={rowHref}
      onIconChange={onIconChange != null ? (icon) => onIconChange(_id, icon) : undefined}
      defaultIconName={pageTypeIconName}
      onPropertyChange={
        onPropertyChange != null
          ? (propertyId, value, eventTimeStamp) =>
              onPropertyChange(_id, propertyId, value, eventTimeStamp)
          : undefined
      }
      onComplete={
        onCompletedAtChange != null ? (value) => onCompletedAtChange(_id, value) : undefined
      }
      onCreateOption={
        onCreateOption != null
          ? (propertyId, label) => onCreateOption(_id, pageData, propertyId, label)
          : undefined
      }
      onDelete={onDelete != null ? () => onDelete(_id) : undefined}
      onToggleFavorite={
        onToggleFavorite != null ? (value) => onToggleFavorite(_id, value) : undefined
      }
      pageHref={pageHrefById}
      relationHref={(propertyId) => {
        const def = properties.find((d) => d.id === propertyId)
        return buildRelationBackLinkHref({
          target: def ? readRelationConfig(def.config) : undefined,
          rowId: _id,
          fallbackHref: rowHref,
          pluralSlugById: pageTypePluralSlugById,
        })
      }}
    />
  )
}
