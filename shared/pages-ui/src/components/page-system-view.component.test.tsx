import { afterEach, describe, expect, it } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PropertyDefinition } from "@shared/pages-core/types"
import type { ViewFilter } from "@shared/pages-core/schema/view-data"
import type { PageRow } from "../view-engine/page-row"
import { PageSystemTabContent } from "./page-system-view"
import type { ServerGroupedSection } from "./page-system-view-types"

afterEach(() => {
  cleanup()
})

const properties: readonly PropertyDefinition[] = [
  { id: "title", title: "Title", type: "text", config: {} },
]

const renderItem = (item: PageRow) => <div data-testid="row">{String(item.title ?? "")}</div>

const baseProps = {
  label: "Items",
  properties,
  renderItem,
  storagePrefix: "test-list-states",
} as const

const sampleRows: PageRow[] = [
  { _id: "p1", title: "First" },
  { _id: "p2", title: "Second" },
]

const filterOnTitle: ViewFilter = {
  propertyId: "title",
  operator: "contains",
  value: "zzz-no-match",
}

describe("PageSystemTabContent — three list states", () => {
  it("loading + no rows: shows a skeleton, no Empty card, no rows", () => {
    render(<PageSystemTabContent {...baseProps} items={[]} isLoading />)
    expect(screen.queryByText("No pages yet")).toBeNull()
    expect(screen.queryByText("No matches")).toBeNull()
    expect(screen.queryByText("No pages")).toBeNull()
    expect(screen.queryAllByTestId("row")).toHaveLength(0)
    expect(document.querySelector('[data-slot="skeleton"]')).not.toBeNull()
  })

  it("not loading + no rows + no narrowing: shows the 'no data yet' Empty card", () => {
    render(<PageSystemTabContent {...baseProps} items={[]} />)
    expect(screen.getByText("No pages yet")).toBeDefined()
    expect(screen.queryByText("No matches")).toBeNull()
    expect(document.querySelector('[data-slot="skeleton"]')).toBeNull()
  })

  it("not loading + no rows + filter active: shows the 'no matches' Empty card", () => {
    render(<PageSystemTabContent {...baseProps} items={[]} defaultFilters={[filterOnTitle]} />)
    expect(screen.getByText("No matches")).toBeDefined()
    expect(screen.queryByText("No pages yet")).toBeNull()
    expect(document.querySelector('[data-slot="skeleton"]')).toBeNull()
  })

  it("not loading + rows present: renders the grid, no skeleton, no Empty", () => {
    render(<PageSystemTabContent {...baseProps} items={sampleRows} />)
    expect(screen.getAllByTestId("row").length).toBeGreaterThan(0)
    expect(screen.queryByText("No pages yet")).toBeNull()
    expect(screen.queryByText("No matches")).toBeNull()
    expect(document.querySelector('[data-slot="skeleton"]')).toBeNull()
  })

  it("loading + rows already present: keeps rows, does not re-render skeleton", () => {
    render(<PageSystemTabContent {...baseProps} items={sampleRows} isLoading />)
    expect(screen.getAllByTestId("row").length).toBeGreaterThan(0)
    expect(document.querySelector('[data-slot="skeleton"]')).toBeNull()
  })
})

const pageTypeOptions = [
  { id: "pt-note", name: "Note" },
  { id: "pt-task", name: "Task" },
] as const

describe("PageSystemTabContent — cross-type nav view skips the page-type gate", () => {
  it("plain nav view without a page type: shows the 'No page type selected' placeholder", () => {
    render(
      <PageSystemTabContent
        {...baseProps}
        items={sampleRows}
        pageTypeOptions={pageTypeOptions}
        storagePrefix="cross-type-plain-nav"
      />
    )
    expect(screen.getByText("No page type selected")).toBeDefined()
    expect(screen.queryAllByTestId("row")).toHaveLength(0)
  })

  it("cross-type nav view (isCrossType, no page type): renders rows, not the placeholder", () => {
    render(
      <PageSystemTabContent
        {...baseProps}
        items={sampleRows}
        pageTypeOptions={pageTypeOptions}
        isCrossType
        storagePrefix="cross-type-nav"
      />
    )
    expect(screen.queryByText("No page type selected")).toBeNull()
    expect(screen.getAllByTestId("row").length).toBeGreaterThan(0)
  })
})

describe("PageSystemTabContent — board degrades to flat on empty group-by", () => {
  it("board layout, rows present, no group-by: renders flat items, not the empty placeholder", () => {
    render(<PageSystemTabContent {...baseProps} items={sampleRows} layout="board" />)
    expect(screen.getAllByTestId("row").length).toBeGreaterThan(0)
    expect(screen.queryByText("Choose a property to group by")).toBeNull()
    expect(screen.queryByText("No pages yet")).toBeNull()
  })
})

const tableProperties: readonly PropertyDefinition[] = [
  { id: "title", title: "Title", type: "text", config: {} },
  { id: "status", title: "Status", type: "text", config: {} },
]

const renderTableRow = (item: PageRow) => (
  <>
    <td>{item._id}</td>
    <td>{String(item.status ?? "")}</td>
  </>
)

function tableGroupedFixture(secondGroupOpenItems = true): readonly ServerGroupedSection[] {
  return [
    {
      key: "g1",
      label: "Group One",
      items: [
        { _id: "a1", title: "Alpha", status: "Open" },
        { _id: "a2", title: "Beta with a much longer title value", status: "Closed" },
      ],
    },
    {
      key: "g2",
      label: "Group Two",
      items: secondGroupOpenItems ? [{ _id: "b1", title: "Gamma", status: "Open" }] : [],
    },
  ]
}

const tableGroupBaseProps = {
  label: "Items",
  properties: tableProperties,
  renderItem,
  renderRow: renderTableRow,
  layout: "table" as const,
  visibleProperties: ["__title__", "status"] as const,
} as const

function colWidths(colgroup: Element): readonly string[] {
  return Array.from(colgroup.querySelectorAll<HTMLTableColElement>("col")).map((c) => c.style.width)
}

describe("PageSystemTabContent — grouped table layout (collapsible per group)", () => {
  it("renders an independent <table> with its own header per group", () => {
    const { container } = render(
      <PageSystemTabContent
        {...tableGroupBaseProps}
        items={[]}
        serverGrouped={tableGroupedFixture()}
        storagePrefix="grouped-table-independent"
      />
    )
    expect(container.querySelectorAll("table").length).toBe(2)
    expect(screen.getAllByText("Name").length).toBe(2)
    expect(screen.getByText("Group One")).toBeDefined()
    expect(screen.getByText("Group Two")).toBeDefined()
    expect(screen.getByText("a1")).toBeDefined()
    expect(screen.getByText("a2")).toBeDefined()
    expect(screen.getByText("b1")).toBeDefined()
  })

  it("applies an identical fixed-layout colgroup width template to every group", () => {
    const { container } = render(
      <PageSystemTabContent
        {...tableGroupBaseProps}
        items={[]}
        serverGrouped={tableGroupedFixture()}
        storagePrefix="grouped-table-widths"
      />
    )
    const [firstColgroup, ...restColgroups] = Array.from(container.querySelectorAll("colgroup"))
    expect(restColgroups.length).toBe(1)
    const tables = container.querySelectorAll<HTMLTableElement>("table")
    for (const table of tables) {
      expect(table.className).toContain("table-fixed")
    }
    expect(firstColgroup).toBeDefined()
    if (!firstColgroup) return
    const first = colWidths(firstColgroup)
    expect(first.length).toBe(2)
    expect(first.every((w) => w.endsWith("px"))).toBe(true)
    for (const cg of restColgroups) {
      expect(colWidths(cg)).toEqual(first)
    }
  })

  it("collapsing a group hides its rows but keeps its header (shared collapsible)", () => {
    render(
      <PageSystemTabContent
        {...tableGroupBaseProps}
        items={[]}
        serverGrouped={tableGroupedFixture()}
        storagePrefix="grouped-table-collapse"
      />
    )
    expect(screen.getByText("b1")).toBeDefined()
    fireEvent.click(screen.getByRole("button", { name: /Group Two/ }))
    expect(screen.queryByText("b1")).toBeNull()
    expect(screen.getByText("Group Two")).toBeDefined()
    expect(screen.getByText("a1")).toBeDefined()
  })
})
