"use client"

import type { IconName } from "akasha/page/core/generated/modules/icon-search-index/icon-search-index.module.code.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { completionShapeOf } from "akasha/page/core/modules/task-lifecycle/task-lifecycle.module.code.ts"
import { PageCard } from "akasha/page/ui/component/modules/page-card/page-card.module.code.tsx"
import { PageCardNotes } from "akasha/page/ui/component/modules/page-card-notes/page-card-notes.module.code.tsx"
import { pageRowToPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import type { PageRow } from "akasha/page/ui/component/view-engine/modules/view-row/view-row.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import type { ReactElement } from "react"

interface BareListingCardContext {
  readonly properties: readonly PropertyDefinition[]
  readonly pageTypeSlug: PageTypeSlug
  readonly visiblePropertyIds: readonly string[]
  readonly alwaysShowPropertyIds: readonly string[]
  readonly notesProperty?: PropertyDefinition
  readonly pageTypeIconName: string | null
  readonly buildRowHref: (row: PageRow) => string
  readonly pageHrefById: (id: string, opts?: { targetPageTypeId?: string }) => string
  readonly makeRelationHref: (rowId: string, rowHref: string) => (propertyId: string) => string
  readonly onIconChange?: (pageId: string, icon: IconName) => void
  readonly onPropertyChange?: (pageId: string, propId: string, value: unknown) => void
  readonly onComplete?: (page: PageRow, atMs: number | null) => void
  readonly onDelete?: (pageId: string) => void
  readonly onToggleFavorite?: (pageId: string, value: number | null) => void
}

export function RenderBareListingCard(page: PageRow, ctx: BareListingCardContext): ReactElement {
  const completion = completionShapeOf(ctx.pageTypeSlug)
  const rowHref = ctx.buildRowHref(page)
  const { _id: id, ...rest } = page
  const pageData = pageRowToPageDataJSON(rest)
  const changeProperty = ctx.onPropertyChange
  const notesSlot =
    ctx.notesProperty != null ? (
      <PageCardNotes
        pageId={id}
        pageTypeSlug={ctx.pageTypeSlug}
        property={ctx.notesProperty}
        lightValue={page[ctx.notesProperty.id]}
        onNotesChange={
          changeProperty === undefined
            ? undefined
            : (propId, value) => changeProperty(id, propId, value)
        }
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
      onIconChange={
        ctx.onIconChange === undefined ? undefined : (icon) => ctx.onIconChange?.(id, icon)
      }
      defaultIconName={ctx.pageTypeIconName}
      onPropertyChange={
        changeProperty === undefined
          ? undefined
          : (propId, value) => changeProperty(id, propId, value)
      }
      pageHref={ctx.pageHrefById}
      relationHref={ctx.makeRelationHref(id, rowHref)}
      completion={completion}
      onComplete={ctx.onComplete != null ? (value) => ctx.onComplete?.(page, value) : undefined}
      onDelete={ctx.onDelete === undefined ? undefined : () => ctx.onDelete?.(id)}
      onToggleFavorite={
        ctx.onToggleFavorite != null ? (value) => ctx.onToggleFavorite?.(id, value) : undefined
      }
    />
  )
}
