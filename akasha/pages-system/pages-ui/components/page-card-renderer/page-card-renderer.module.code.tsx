"use client"

import type { IconName } from "@akasha/pages-core/generated/icon-search-index"
import type { PageDataJSON, PropertyDefinition } from "@akasha/pages-core/types"
import { type GalleryCardSize, resolveGalleryCoverUrl } from "@akasha/pages-core/view/gallery"
import { getCoverClickHandler } from "@akasha/pages-ui/cover-click/cover-click-registry"
import { getCoverMask } from "@akasha/pages-ui/cover-click/cover-mask-registry"
import { pageRowToPageDataJSON } from "@akasha/pages-ui-components/page-data-json"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"
import {
  buildRelationBackLinkHref,
  buildRowHref,
  readRelationConfig,
} from "@akasha/pages-ui-components/view-tab-content-href"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { PageCard } from "../page-card/page-card.module.code.tsx"
import { PageCardNotes } from "../page-card-notes/page-card-notes.module.code.tsx"

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
  const { _id: id, ...rest } = page
  const fill = rowAggregates.get(id)
  const pageData = pageRowToPageDataJSON(fill ? { ...rest, ...fill } : rest)
  const coverHandler =
    coverActionCapability != null ? getCoverClickHandler(coverActionCapability) : undefined
  const onCoverClick =
    coverHandler != null && rowPageTypeSlug != null
      ? () => coverHandler({ pageId: id, pageTypeSlug: rowPageTypeSlug, data: pageData })
      : undefined
  const coverMask = rowPageTypeSlug != null ? getCoverMask(rowPageTypeSlug) : undefined
  const coverMaskGlyph =
    coverMask != null && rowPageTypeSlug != null
      ? coverMask({ pageId: id, pageTypeSlug: rowPageTypeSlug, data: pageData })
      : null
  const notesSlot =
    notesProperty != null && rowPageTypeSlug != null ? (
      <PageCardNotes
        pageId={id}
        pageTypeSlug={rowPageTypeSlug}
        property={notesProperty}
        lightValue={page[notesProperty.id]}
        onNotesChange={(propertyId, value) => onPropertyChange?.(id, propertyId, value)}
      />
    ) : undefined
  return (
    <PageCard
      id={id}
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
      onIconChange={onIconChange != null ? (icon) => onIconChange(id, icon) : undefined}
      defaultIconName={pageTypeIconName}
      onPropertyChange={
        onPropertyChange != null
          ? (propertyId, value, eventTimeStamp) =>
              onPropertyChange(id, propertyId, value, eventTimeStamp)
          : undefined
      }
      onComplete={
        onCompletedAtChange != null ? (value) => onCompletedAtChange(id, value) : undefined
      }
      onCreateOption={
        onCreateOption != null
          ? (propertyId, label) => onCreateOption(id, pageData, propertyId, label)
          : undefined
      }
      onDelete={onDelete != null ? () => onDelete(id) : undefined}
      onToggleFavorite={
        onToggleFavorite != null ? (value) => onToggleFavorite(id, value) : undefined
      }
      pageHref={pageHrefById}
      relationHref={(propertyId) => {
        const def = properties.find((d) => d.id === propertyId)
        return buildRelationBackLinkHref({
          target: def ? readRelationConfig(def.config) : undefined,
          rowId: id,
          fallbackHref: rowHref,
          pluralSlugById: pageTypePluralSlugById,
        })
      }}
    />
  )
}
