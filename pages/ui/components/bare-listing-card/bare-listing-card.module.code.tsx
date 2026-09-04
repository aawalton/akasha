"use client"

import type { IconName } from "@akasha/pages-core/generated/icon-search-index"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { pageRowToPageDataJSON } from "@akasha/pages-ui-components/page-data-json"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import type { ReactElement } from "react"
import { PageCard } from "../page-card/page-card.module.code.tsx"
import { PageCardNotes } from "../page-card-notes/page-card-notes.module.code.tsx"

export interface BareListingCardContext {
  readonly properties: readonly PropertyDefinition[]
  readonly pageTypeSlug: PageTypeSlug
  readonly visiblePropertyIds: readonly string[]
  readonly alwaysShowPropertyIds: readonly string[]
  readonly notesProperty?: PropertyDefinition
  readonly pageTypeIconName: string | null
  readonly rowAggregates: ReadonlyMap<string, Record<string, number | null>>
  readonly buildRowHref: (row: PageRow) => string
  readonly pageHrefById: (id: string, opts?: { targetPageTypeId?: string }) => string
  readonly makeRelationHref: (rowId: string, rowHref: string) => (propertyId: string) => string
  readonly onIconChange: (pageId: string, icon: IconName) => void
  readonly onPropertyChange: (pageId: string, propId: string, value: unknown) => void
  readonly onDelete: (pageId: string) => void
  readonly onToggleFavorite?: (pageId: string, value: number | null) => void
}

export function RenderBareListingCard(page: PageRow, ctx: BareListingCardContext): ReactElement {
  const rowHref = ctx.buildRowHref(page)
  const { _id: id, ...rest } = page
  const fill = ctx.rowAggregates.get(id)
  const pageData = pageRowToPageDataJSON(fill ? { ...rest, ...fill } : rest)
  const notesSlot =
    ctx.notesProperty != null ? (
      <PageCardNotes
        pageId={id}
        pageTypeSlug={ctx.pageTypeSlug}
        property={ctx.notesProperty}
        lightValue={page[ctx.notesProperty.id]}
        onNotesChange={(propId, value) => ctx.onPropertyChange(id, propId, value)}
      />
    ) : undefined
  return (
    <PageCard
      id={id}
      definitions={ctx.properties}
      data={pageData}
      pageTypeSlug={ctx.pageTypeSlug}
      visiblePropertyIds={ctx.visiblePropertyIds}
      alwaysShowPropertyIds={ctx.alwaysShowPropertyIds}
      notesSlot={notesSlot}
      href={rowHref}
      onIconChange={(icon) => ctx.onIconChange(id, icon)}
      defaultIconName={ctx.pageTypeIconName}
      onPropertyChange={(propId, value) => ctx.onPropertyChange(id, propId, value)}
      pageHref={ctx.pageHrefById}
      relationHref={ctx.makeRelationHref(id, rowHref)}
      onComplete={(value) => ctx.onPropertyChange(id, "completedAt", value)}
      onDelete={() => ctx.onDelete(id)}
      onToggleFavorite={
        ctx.onToggleFavorite != null ? (value) => ctx.onToggleFavorite?.(id, value) : undefined
      }
    />
  )
}
