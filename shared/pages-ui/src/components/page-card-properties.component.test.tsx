import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PageDataJSON, PropertyDefinition } from "@shared/pages-core/types"
import { PageCardProperties } from "./page-card-properties.tsx"

mock.module("../supabase/use-set-property-optimistic", () => ({
  useSetPropertyOptimistic: () => () => {},
}))

afterEach(() => {
  cleanup()
})

const definitions: readonly PropertyDefinition[] = [
  { id: "title", title: "Title", type: "text", config: {} },
  { id: "foo", title: "Foo", type: "text", config: {} },
  { id: "bar", title: "Bar", type: "text", config: {} },
]

const data: PageDataJSON = {
  title: "Page Title",
  foo: "FOO_VALUE",
  bar: "BAR_VALUE",
}

describe("PageCardProperties — visiblePropertyIds allowlist", () => {
  it("renders no eligible-property badges when visiblePropertyIds is undefined", () => {
    render(<PageCardProperties definitions={definitions} data={data} />)
    expect(screen.queryByText("FOO_VALUE")).toBeNull()
    expect(screen.queryByText("BAR_VALUE")).toBeNull()
  })

  it("renders no eligible-property badges when visiblePropertyIds is []", () => {
    render(<PageCardProperties definitions={definitions} data={data} visiblePropertyIds={[]} />)
    expect(screen.queryByText("FOO_VALUE")).toBeNull()
    expect(screen.queryByText("BAR_VALUE")).toBeNull()
  })

  it("renders only foo's badge when visiblePropertyIds=['foo']", () => {
    render(
      <PageCardProperties definitions={definitions} data={data} visiblePropertyIds={["foo"]} />
    )
    expect(screen.getByText("FOO_VALUE")).toBeDefined()
    expect(screen.queryByText("BAR_VALUE")).toBeNull()
  })

  it("renders no badges when visiblePropertyIds lists only the reserved id 'title'", () => {
    render(
      <PageCardProperties definitions={definitions} data={data} visiblePropertyIds={["title"]} />
    )
    expect(screen.queryByText("FOO_VALUE")).toBeNull()
    expect(screen.queryByText("BAR_VALUE")).toBeNull()
  })

  it("renders badges in visiblePropertyIds order, not definitions order", () => {
    render(
      <PageCardProperties
        definitions={definitions}
        data={data}
        visiblePropertyIds={["bar", "foo"]}
      />
    )
    const fooEl = screen.getByText("FOO_VALUE")
    const barEl = screen.getByText("BAR_VALUE")
    expect(barEl.compareDocumentPosition(fooEl) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    )
  })

  it("dedupes repeated ids in visiblePropertyIds", () => {
    render(
      <PageCardProperties
        definitions={definitions}
        data={data}
        visiblePropertyIds={["foo", "foo", "bar"]}
      />
    )
    expect(screen.getAllByText("FOO_VALUE")).toHaveLength(1)
    expect(screen.getAllByText("BAR_VALUE")).toHaveLength(1)
  })
})

describe("PageCardProperties — no trailing time element", () => {
  const timeDefinitions: readonly PropertyDefinition[] = [
    { id: "startedAt", title: "Started", type: "instant", config: {} },
    { id: "completedAt", title: "Completed", type: "instant", config: {} },
  ]
  const timeData: PageDataJSON = {
    startedAt: "2026-01-01T00:00:00.000Z",
    completedAt: "2026-01-01T01:30:00.000Z",
  }

  it("renders nothing when only time defs are present and no badges are visible", () => {
    const { container } = render(
      <PageCardProperties definitions={timeDefinitions} data={timeData} />
    )
    expect(container.firstChild).toBeNull()
  })
})

const dataWithEmptyFoo: PageDataJSON = {
  title: "Page Title",
  foo: null,
  bar: "BAR_VALUE",
}

describe("PageCardProperties — alwaysShowPropertyIds tri-state", () => {
  it("renders an always-show property with an empty value (does not collapse)", () => {
    render(
      <PageCardProperties
        definitions={definitions}
        data={dataWithEmptyFoo}
        visiblePropertyIds={["foo"]}
        alwaysShowPropertyIds={["foo"]}
        onPropertyChange={() => {}}
      />
    )
    expect(screen.getByPlaceholderText("Enter text...")).toBeDefined()
  })

  it("collapses a hide-when-empty property with an empty value", () => {
    render(
      <PageCardProperties
        definitions={definitions}
        data={dataWithEmptyFoo}
        visiblePropertyIds={["foo"]}
        alwaysShowPropertyIds={[]}
        onPropertyChange={() => {}}
      />
    )
    expect(screen.queryByPlaceholderText("Enter text...")).toBeNull()
  })

  it("still renders a non-empty hide-when-empty property", () => {
    render(
      <PageCardProperties
        definitions={definitions}
        data={dataWithEmptyFoo}
        visiblePropertyIds={["bar"]}
        alwaysShowPropertyIds={[]}
      />
    )
    expect(screen.getByText("BAR_VALUE")).toBeDefined()
  })

  it("default (no alwaysShowPropertyIds): an empty visible property collapses (unchanged)", () => {
    render(
      <PageCardProperties
        definitions={definitions}
        data={dataWithEmptyFoo}
        visiblePropertyIds={["foo"]}
        onPropertyChange={() => {}}
      />
    )
    expect(screen.queryByPlaceholderText("Enter text...")).toBeNull()
  })
})

describe("PageCardProperties — action-button empty carve-out", () => {
  const actionDefs: readonly PropertyDefinition[] = [
    { id: "run", title: "Run", type: "action-button", config: { verbId: "x", label: "Run It" } },
    { id: "note", title: "Note", type: "text", config: {} },
  ]
  const emptyData: PageDataJSON = {}

  it("renders an action-button badge when its value is empty and it is not always-show", () => {
    render(
      <PageCardProperties
        definitions={actionDefs}
        data={emptyData}
        visiblePropertyIds={["run"]}
        alwaysShowPropertyIds={[]}
      />
    )
    expect(screen.getByRole("button")).toBeDefined()
  })

  it("still collapses an empty text property that is not always-show (unchanged)", () => {
    render(
      <PageCardProperties
        definitions={actionDefs}
        data={emptyData}
        visiblePropertyIds={["note"]}
        alwaysShowPropertyIds={[]}
      />
    )
    expect(screen.queryByRole("button")).toBeNull()
    expect(screen.queryByText("Note")).toBeNull()
  })
})
