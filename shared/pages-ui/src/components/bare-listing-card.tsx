"use client"

import type { IconName } from "@shared/pages-core/icon"
import type { PropertyDefinition } from "@shared/pages-core/types"
import type { PageTypeSlug } from "@shared/pages-url"
import type { ReactElement } from "react"
import type { PageRow } from "../view-engine/page-row"
import { PageCard } from "./page-card"
import { PageCardNotes } from "./page-card-notes"
import { pageRowToPageDataJSON } from "./page-data-json"

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

export function renderBareListingCard(page: PageRow, ctx: BareListingCardContext): ReactElement {
  const rowHref = ctx.buildRowHref(page)
  const { _id, ...rest } = page
  const fill = ctx.rowAggregates.get(_id)
  const pageData = pageRowToPageDataJSON(fill ? { ...rest, ...fill } : rest)
  const notesSlot =
    ctx.notesProperty != null ? (
      <PageCardNotes
        pageId={_id}
        pageTypeSlug={ctx.pageTypeSlug}
        property={ctx.notesProperty}
        lightValue={page[ctx.notesProperty.id]}
        onNotesChange={(propId, value) => ctx.onPropertyChange(_id, propId, value)}
      />
    ) : undefined
  return (
    <PageCard
      id={_id}
      definitions={ctx.properties}
      data={pageData}
      pageTypeSlug={ctx.pageTypeSlug}
      visiblePropertyIds={ctx.visiblePropertyIds}
      alwaysShowPropertyIds={ctx.alwaysShowPropertyIds}
      notesSlot={notesSlot}
      href={rowHref}
      onIconChange={(icon) => ctx.onIconChange(_id, icon)}
      defaultIconName={ctx.pageTypeIconName}
      onPropertyChange={(propId, value) => ctx.onPropertyChange(_id, propId, value)}
      pageHref={ctx.pageHrefById}
      relationHref={ctx.makeRelationHref(_id, rowHref)}
      onComplete={(value) => ctx.onPropertyChange(_id, "completedAt", value)}
      onDelete={() => ctx.onDelete(_id)}
      onToggleFavorite={
        ctx.onToggleFavorite != null ? (value) => ctx.onToggleFavorite?.(_id, value) : undefined
      }
    />
  )
}
