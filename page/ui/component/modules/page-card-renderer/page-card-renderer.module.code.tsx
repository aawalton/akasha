"use client"

import type { IconName } from "akasha/page/core/generated/modules/icon-search-index/icon-search-index.module.code.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { completionShapeOf } from "akasha/page/core/modules/task-lifecycle/task-lifecycle.module.code.ts"
import {
  type GalleryCardSize,
  resolveGalleryCoverUrl,
} from "akasha/page/core/view/modules/gallery/gallery.module.code.ts"
import { PageCard } from "akasha/page/ui/component/modules/page-card/page-card.module.code.tsx"
import { PageCardNotes } from "akasha/page/ui/component/modules/page-card-notes/page-card-notes.module.code.tsx"
import { pageRowToPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import {
  buildRelationBackLinkHref,
  buildRowHref,
  readRelationConfig,
} from "akasha/page/ui/component/modules/view-tab-content-href/view-tab-content-href.module.code.ts"
import type { PageRow } from "akasha/page/ui/component/view-engine/modules/view-row/view-row.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"

interface PageCardRendererProps {
  page: PageRow
  properties: readonly PropertyDefinition[]
  visibleProperties?: readonly string[]
  alwaysShowProperties?: readonly string[]
  rowPageTypeSlug?: PageTypeSlug
  rowAggregates: ReadonlyMap<string, Record<string, number | null>>
  pageTypeIconName: string | null
  pageHrefById: (id: string, opts?: { targetPageTypeId?: string }) => string
  pageTypeSlugById?: ReadonlyMap<string, PageTypeSlug>
  onIconChange?: (pageId: string, icon: IconName) => void
  onPropertyChange?: (
    pageId: string,
    propertyId: string,
    value: unknown,
    eventTimeStamp?: number
  ) => void
  onComplete?: (page: PageRow, atMs: number | null) => void
  onDelete?: (pageId: string) => void
  onToggleFavorite?: (pageId: string, value: number | null) => void
  galleryCardSize?: GalleryCardSize
  galleryCoverSourceId?: string
  notesProperty?: PropertyDefinition
  coverMaskGlyph?: string | null
  onCoverClick?: () => void
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
  pageTypeSlugById,
  onIconChange,
  onPropertyChange,
  onComplete,
  onDelete,
  onToggleFavorite,
  galleryCardSize,
  galleryCoverSourceId,
  notesProperty,
  coverMaskGlyph,
  onCoverClick,
}: PageCardRendererProps) {
  const completion = rowPageTypeSlug == null ? null : completionShapeOf(rowPageTypeSlug)
  const viewRowHref = buildRowHref(rowPageTypeSlug, page)
  const rowHref = viewRowHref !== "" ? viewRowHref : pageHrefById(page._id)
  const coverUrl =
    galleryCardSize != null && galleryCoverSourceId != null
      ? resolveGalleryCoverUrl(page[galleryCoverSourceId])
      : null
  const { _id: id, ...rest } = page
  const fill = rowAggregates.get(id)
  const pageData = pageRowToPageDataJSON(fill ? { ...rest, ...fill } : rest)
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
      completion={completion}
      onComplete={onComplete != null ? (value) => onComplete(page, value) : undefined}
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
          slugById: pageTypeSlugById,
        })
      }}
    />
  )
}
