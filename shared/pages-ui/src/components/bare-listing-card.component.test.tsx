import { afterEach, describe, expect, it } from "bun:test"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { PageTypeSlug } from "@shared/pages-url"
import { cleanup, screen } from "@shared/utils-test"
import { render as rtlRender } from "@shared/utils-test/render"
import type { ReactElement, ReactNode } from "react"
import { type PagesUILinkProps, PagesUILinkProvider } from "../router-context"
import type { PageRow } from "../view-engine/page-row"
import { type BareListingCardContext, renderBareListingCard } from "./bare-listing-card"

function TestLink({ href, onClick, className, children }: PagesUILinkProps) {
  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  )
}

function LinkWrap({ children }: { children: ReactNode }) {
  return <PagesUILinkProvider component={TestLink}>{children}</PagesUILinkProvider>
}

function render(ui: ReactElement, options?: Parameters<typeof rtlRender>[1]) {
  return rtlRender(ui, { wrapper: LinkWrap, ...options })
}

const DEFINITIONS: readonly PropertyDefinition[] = [
  { id: "stage", title: "Stage", type: "text", config: {} } satisfies PropertyDefinition,
]

const ROW = { _id: "row-1", title: "Row One", stage: "Active" } satisfies PageRow

function makeContext(visiblePropertyIds: readonly string[]): BareListingCardContext {
  return {
    properties: DEFINITIONS,
    pageTypeSlug: PageTypeSlug("task"),
    visiblePropertyIds,
    alwaysShowPropertyIds: [],
    pageTypeIconName: null,
    rowAggregates: new Map(),
    buildRowHref: () => "/tasks/row-one-row-1",
    pageHrefById: () => "/tasks/row-one-row-1",
    makeRelationHref: () => () => "/tasks/row-one-row-1",
    onIconChange: () => {},
    onPropertyChange: () => {},
    onDelete: () => {},
  }
}

afterEach(cleanup)

describe("renderBareListingCard — property badges", () => {
  it("Case A: a configured visible property renders as a badge on the card", () => {
    render(renderBareListingCard(ROW, makeContext(["stage"])))

    expect(screen.getByDisplayValue("Active")).toBeTruthy()
  })

  it("Case B (control): an empty visible-properties list renders no badge", () => {
    render(renderBareListingCard(ROW, makeContext([])))

    expect(screen.getAllByText("Row One").length).toBeGreaterThan(0)
    expect(screen.queryByDisplayValue("Active")).toBeNull()
  })
})
