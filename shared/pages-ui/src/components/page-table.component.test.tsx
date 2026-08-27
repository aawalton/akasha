import { afterEach, describe, expect, it } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { ReactNode } from "react"
import type { PageDataJSON, PropertyDefinition } from "@shared/pages-core/types"
import type { PageRow } from "../view-engine/page-row"
import { PageTable, PageTableRowCells } from "./page-table"
import { ReorderableColumnTable } from "./page-table-header"
import type { PageTableColumn } from "./page-table-shared"

afterEach(() => {
  cleanup()
})

function renderRowCells(node: ReactNode) {
  return render(
    <table>
      <tbody>
        <tr>{node}</tr>
      </tbody>
    </table>
  )
}

const columns = [
  { id: "__title__", label: "Name" },
  { id: "status", label: "Status" },
] as const

const items: PageRow[] = [{ _id: "p1" }, { _id: "p2" }, { _id: "p3" }]

describe("PageTable", () => {
  it("renders one header cell per column", () => {
    render(<PageTable items={items} columns={[...columns]} renderRow={() => <td />} />)
    expect(screen.getByText("Name")).toBeDefined()
    expect(screen.getByText("Status")).toBeDefined()
  })

  it("renders one row per item via renderRow", () => {
    render(
      <PageTable items={items} columns={[...columns]} renderRow={(item) => <td>{item._id}</td>} />
    )
    expect(screen.getByText("p1")).toBeDefined()
    expect(screen.getByText("p2")).toBeDefined()
    expect(screen.getByText("p3")).toBeDefined()
  })

  it("uses fixed layout with a pixel-width colgroup and a table min-width", () => {
    const widthCols = [
      { id: "__title__", label: "Name", width: 220 },
      { id: "status", label: "Status", width: 120 },
    ]
    const { container } = render(
      <PageTable items={items} columns={widthCols} renderRow={(item) => <td>{item._id}</td>} />
    )
    const table = container.querySelector<HTMLTableElement>("table")
    expect(table?.className).toContain("table-fixed")
    const cols = container.querySelectorAll<HTMLTableColElement>("col")
    expect(cols.length).toBe(2)
    expect(cols[0]?.style.width).toBe("220px")
    expect(table?.style.minWidth).toBe("340px")
  })

  it("caps visible rows at pageSize and hides the overflow", () => {
    render(
      <PageTable
        items={items}
        columns={[...columns]}
        pageSize={2}
        renderRow={(item) => <td>{item._id}</td>}
      />
    )
    expect(screen.getByText("p1")).toBeDefined()
    expect(screen.getByText("p2")).toBeDefined()
    expect(screen.queryByText("p3")).toBeNull()
  })
})

const cellDefinitions: readonly PropertyDefinition[] = [
  { id: "title", title: "Title", type: "text", config: {} },
  { id: "foo", title: "Foo", type: "text", config: {} },
]

const cellDataEmptyFoo: PageDataJSON = {
  title: "Row Title",
  foo: null,
}

describe("PageTableRowCells — trailing actions cell (#15525)", () => {
  it("renders the Page actions menu trigger when favorite/delete are wired", () => {
    renderRowCells(
      <PageTableRowCells
        data={{ title: "Ravah" }}
        definitions={[]}
        visibleProperties={["__title__"]}
        rowHref="/story/ravah-00000000"
        isFavorite={false}
        onToggleFavorite={() => {}}
        onDelete={() => {}}
      />
    )
    expect(screen.getByRole("button", { name: "Page actions" })).toBeDefined()
  })

  it("renders no actions trigger when neither favorite nor delete is wired", () => {
    renderRowCells(
      <PageTableRowCells
        data={{ title: "Ravah" }}
        definitions={[]}
        visibleProperties={["__title__"]}
        rowHref="/story/ravah-00000000"
      />
    )
    expect(screen.queryByRole("button", { name: "Page actions" })).toBeNull()
  })
})

describe("PageTable — trailing actions header column (#15525)", () => {
  it("appends one trailing header cell when hasRowActions is set", () => {
    const { container } = render(
      <PageTable items={items} columns={[...columns]} renderRow={() => <td />} hasRowActions />
    )
    expect(container.querySelectorAll("thead th").length).toBe(columns.length + 1)
    expect(container.querySelectorAll("colgroup col").length).toBe(columns.length + 1)
  })

  it("keeps the header at one cell per column when hasRowActions is absent", () => {
    const { container } = render(
      <PageTable items={items} columns={[...columns]} renderRow={() => <td />} />
    )
    expect(container.querySelectorAll("thead th").length).toBe(columns.length)
  })
})

describe("PageTableRowCells — editable property badges", () => {
  it("renders the editable text input for an empty property when onPropertyChange is wired", () => {
    renderRowCells(
      <PageTableRowCells
        data={cellDataEmptyFoo}
        definitions={cellDefinitions}
        visibleProperties={["foo"]}
        rowHref="/pages/thing/row-title-00000000"
        onPropertyChange={() => {}}
      />
    )
    expect(screen.getByPlaceholderText("Enter text...")).toBeDefined()
  })

  it("stays read-only (no editable input) when onPropertyChange is omitted", () => {
    renderRowCells(
      <PageTableRowCells
        data={cellDataEmptyFoo}
        definitions={cellDefinitions}
        visibleProperties={["foo"]}
        rowHref="/pages/thing/row-title-00000000"
      />
    )
    expect(screen.queryByPlaceholderText("Enter text...")).toBeNull()
  })
})

const completableDefinitions: readonly PropertyDefinition[] = [
  { id: "title", title: "Title", type: "text", config: {} },
  { id: "completedAt", title: "Completed At", type: "instant", config: {} },
]

const incompleteRow: PageDataJSON = { title: "Task Row", icon: "circle-dot", completedAt: null }
const completeRow: PageDataJSON = {
  title: "Task Row",
  icon: "circle-dot",
  completedAt: 1700000000000,
}

describe("PageTableRowCells — completion toggle", () => {
  it("renders the Complete toggle when onComplete is wired and completedAt is defined", () => {
    renderRowCells(
      <PageTableRowCells
        data={incompleteRow}
        definitions={completableDefinitions}
        visibleProperties={["__title__"]}
        rowHref="/pages/thing/task-row-00000000"
        onComplete={() => {}}
      />
    )
    expect(screen.getByLabelText("Complete")).toBeDefined()
  })

  it("renders the Uncomplete toggle for a completed row", () => {
    renderRowCells(
      <PageTableRowCells
        data={completeRow}
        definitions={completableDefinitions}
        visibleProperties={["__title__"]}
        rowHref="/pages/thing/task-row-00000000"
        onComplete={() => {}}
      />
    )
    expect(screen.getByLabelText("Uncomplete")).toBeDefined()
  })

  it("fires onComplete with a timestamp when an incomplete toggle is clicked", () => {
    let received: number | null | undefined
    renderRowCells(
      <PageTableRowCells
        data={incompleteRow}
        definitions={completableDefinitions}
        visibleProperties={["__title__"]}
        rowHref="/pages/thing/task-row-00000000"
        onComplete={(value) => {
          received = value
        }}
      />
    )
    fireEvent.click(screen.getByLabelText("Complete"))
    expect(typeof received).toBe("number")
  })

  it("fires onComplete with null when a completed toggle is clicked", () => {
    let received: number | null | undefined = 0
    renderRowCells(
      <PageTableRowCells
        data={completeRow}
        definitions={completableDefinitions}
        visibleProperties={["__title__"]}
        rowHref="/pages/thing/task-row-00000000"
        onComplete={(value) => {
          received = value
        }}
      />
    )
    fireEvent.click(screen.getByLabelText("Uncomplete"))
    expect(received).toBeNull()
  })

  it("shows no toggle when onComplete is omitted", () => {
    renderRowCells(
      <PageTableRowCells
        data={incompleteRow}
        definitions={completableDefinitions}
        visibleProperties={["__title__"]}
        rowHref="/pages/thing/task-row-00000000"
      />
    )
    expect(screen.queryByLabelText("Complete")).toBeNull()
    expect(screen.queryByLabelText("Uncomplete")).toBeNull()
  })

  it("shows no toggle when the page type has no completedAt definition", () => {
    renderRowCells(
      <PageTableRowCells
        data={cellDataEmptyFoo}
        definitions={cellDefinitions}
        visibleProperties={["__title__"]}
        rowHref="/pages/thing/row-title-00000000"
        onComplete={() => {}}
      />
    )
    expect(screen.queryByLabelText("Complete")).toBeNull()
  })
})

describe("ReorderableColumnTable — header labels track incoming column order", () => {
  const noopReorder = () => {}
  const body = (
    <tbody>
      <tr>
        <td>row</td>
      </tr>
    </tbody>
  )

  function headerLabels(): readonly string[] {
    return screen.getAllByRole("columnheader").map((th) => th.textContent?.trim() ?? "")
  }

  function renderTable(cols: readonly PageTableColumn[]) {
    return render(
      <ReorderableColumnTable columns={cols} onReorderColumns={noopReorder}>
        {body}
      </ReorderableColumnTable>
    )
  }

  it("reorders header labels when incoming order changes within the same visible set", () => {
    const { rerender } = renderTable([
      { id: "__title__", label: "Name" },
      { id: "status", label: "Status" },
    ])
    expect(headerLabels()).toEqual(["Name", "Status"])

    rerender(
      <ReorderableColumnTable
        columns={[
          { id: "status", label: "Status" },
          { id: "__title__", label: "Name" },
        ]}
        onReorderColumns={noopReorder}
      >
        {body}
      </ReorderableColumnTable>
    )
    expect(headerLabels()).toEqual(["Status", "Name"])
  })

  it("adopts incoming order when a column is added (placed first, not appended)", () => {
    const { rerender } = renderTable([
      { id: "__title__", label: "Name" },
      { id: "status", label: "Status" },
    ])
    expect(headerLabels()).toEqual(["Name", "Status"])

    rerender(
      <ReorderableColumnTable
        columns={[
          { id: "priority", label: "Priority" },
          { id: "__title__", label: "Name" },
          { id: "status", label: "Status" },
        ]}
        onReorderColumns={noopReorder}
      >
        {body}
      </ReorderableColumnTable>
    )
    expect(headerLabels()).toEqual(["Priority", "Name", "Status"])
  })

  it("drops a header label when a column becomes hidden", () => {
    const { rerender } = renderTable([
      { id: "__title__", label: "Name" },
      { id: "status", label: "Status" },
      { id: "priority", label: "Priority" },
    ])
    expect(headerLabels()).toEqual(["Name", "Status", "Priority"])

    rerender(
      <ReorderableColumnTable
        columns={[
          { id: "__title__", label: "Name" },
          { id: "priority", label: "Priority" },
        ]}
        onReorderColumns={noopReorder}
      >
        {body}
      </ReorderableColumnTable>
    )
    expect(headerLabels()).toEqual(["Name", "Priority"])
  })
})
