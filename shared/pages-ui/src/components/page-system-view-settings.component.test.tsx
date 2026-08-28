import { afterEach, describe, expect, it, mock } from "bun:test"
import { requireFirst } from "@shared/utils-narrow/require-first"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { ViewSettingsButton } from "./page-system-view-settings"

afterEach(() => {
  cleanup()
})

const initialGroupBy: string | null = null
const baseProps = {
  groupOptions: [{ value: "g1", label: "Group 1" }],
  groupBy: initialGroupBy,
  onGroupByChange: () => {},
  groupSorts: [],
  onGroupSortsChange: () => {},
  groupSortOptions: [],
  defaultGroupSorts: [],
}

const eligibleOptions = [
  { id: "foo", label: "Foo" },
  { id: "bar", label: "Bar" },
  { id: "baz", label: "Baz" },
]

const openMenu = () => {
  fireEvent.click(screen.getByRole("button", { name: "View settings" }))
}

const openSubview = () => {
  openMenu()
  fireEvent.click(screen.getByText("Property Visibility"))
}

const ALL_HEADINGS = ["Always Show", "Hide When Empty", "Always Hide"] as const

const rowLabelsInOrder = (): readonly string[] =>
  screen
    .getAllByRole("button", { name: /^Reorder / })
    .map((node) => (node.getAttribute("aria-label") ?? "").replace(/^Reorder /, ""))

const headingsInOrder = (): readonly string[] =>
  ALL_HEADINGS.filter((h) => screen.queryByText(h) != null)

const labelsUnderHeading = (heading: string): readonly string[] => {
  const headingEl = screen.getByText(heading)
  const section = headingEl.parentElement?.parentElement
  if (section == null) throw new Error(`no section wrapper for ${heading}`)
  return Array.from(section.querySelectorAll<HTMLElement>('button[aria-label^="Reorder "]')).map(
    (node) => (node.getAttribute("aria-label") ?? "").replace(/^Reorder /, "")
  )
}

describe("ViewSettingsButton — Property Visibility sub-view", () => {
  it("shows the 'Property Visibility' menu entry when eligibleOptions and onChange are provided", () => {
    render(
      <ViewSettingsButton
        {...baseProps}
        eligiblePropertyOptions={eligibleOptions}
        visibleProperties={[]}
        onVisibilityChange={() => {}}
      />
    )
    openMenu()
    expect(screen.getByText("Property Visibility")).toBeDefined()
  })

  it("hides the entry when eligiblePropertyOptions is undefined", () => {
    render(
      <ViewSettingsButton {...baseProps} visibleProperties={[]} onVisibilityChange={() => {}} />
    )
    openMenu()
    expect(screen.queryByText("Property Visibility")).toBeNull()
  })

  it("hides the entry when eligiblePropertyOptions is empty", () => {
    render(
      <ViewSettingsButton
        {...baseProps}
        eligiblePropertyOptions={[]}
        visibleProperties={[]}
        onVisibilityChange={() => {}}
      />
    )
    openMenu()
    expect(screen.queryByText("Property Visibility")).toBeNull()
  })

  it("renders all three section headers, with every hidden row under Always Hide (alpha order)", () => {
    render(
      <ViewSettingsButton
        {...baseProps}
        eligiblePropertyOptions={eligibleOptions}
        visibleProperties={[]}
        onVisibilityChange={() => {}}
      />
    )
    openSubview()
    expect(headingsInOrder()).toEqual([...ALL_HEADINGS])
    expect(rowLabelsInOrder()).toEqual(["Bar", "Baz", "Foo"])
    expect(labelsUnderHeading("Always Show")).toEqual([])
    expect(labelsUnderHeading("Hide When Empty")).toEqual([])
    expect(labelsUnderHeading("Always Hide")).toEqual(["Bar", "Baz", "Foo"])
  })

  it("places each row under the section matching its visibility membership", () => {
    render(
      <ViewSettingsButton
        {...baseProps}
        eligiblePropertyOptions={eligibleOptions}
        visibleProperties={["foo", "baz"]}
        alwaysShowProperties={["baz"]}
        onVisibilityChange={() => {}}
      />
    )
    openSubview()
    expect(labelsUnderHeading("Always Show")).toEqual(["Baz"])
    expect(labelsUnderHeading("Hide When Empty")).toEqual(["Foo"])
    expect(labelsUnderHeading("Always Hide")).toEqual(["Bar"])
  })

  it("renders no per-row mode controls and no bulk buttons (pure drag-and-drop)", () => {
    render(
      <ViewSettingsButton
        {...baseProps}
        eligiblePropertyOptions={eligibleOptions}
        visibleProperties={["foo"]}
        onVisibilityChange={() => {}}
      />
    )
    openSubview()
    expect(screen.queryAllByRole("radio")).toEqual([])
    for (const label of ["Hide all", "Show all", "Hide when empty all", "Always hide"]) {
      expect(screen.queryByRole("button", { name: label })).toBeNull()
    }
  })

  it("the sub-view exposes a back button that returns to the main menu", () => {
    render(
      <ViewSettingsButton
        {...baseProps}
        eligiblePropertyOptions={eligibleOptions}
        visibleProperties={[]}
        onVisibilityChange={() => {}}
      />
    )
    openSubview()
    expect(screen.getByText("Property Visibility")).toBeDefined()
    fireEvent.click(screen.getByRole("button", { name: "Back" }))
    expect(screen.queryByText("Foo")).toBeNull()
    expect(screen.getByText("Property Visibility")).toBeDefined()
  })
})

describe("ViewSettingsButton — Page Type entry", () => {
  const pageTypeOptions = [
    { id: "pt-task", name: "Task" },
    { id: "pt-note", name: "Note" },
  ]

  const openPageTypeSubview = () => {
    openMenu()
    fireEvent.click(screen.getByRole("button", { name: /Page Type/i }))
  }

  it("shows the Page Type entry when options and a handler are provided", () => {
    render(
      <ViewSettingsButton
        {...baseProps}
        pageTypeOptions={pageTypeOptions}
        pageTypeId="pt-task"
        onPageTypeChange={() => {}}
      />
    )
    openMenu()
    expect(screen.getByRole("button", { name: /Page Type/i })).toBeDefined()
  })

  it("hides the Page Type entry when no options are provided", () => {
    render(<ViewSettingsButton {...baseProps} />)
    openMenu()
    expect(screen.queryByText("Page Type")).toBeNull()
  })

  it("invokes onPageTypeChange with the selected option id", () => {
    const onPageTypeChange = mock((_id: string) => {})
    render(
      <ViewSettingsButton
        {...baseProps}
        pageTypeOptions={pageTypeOptions}
        pageTypeId="pt-task"
        onPageTypeChange={onPageTypeChange}
      />
    )
    openPageTypeSubview()
    fireEvent.click(screen.getByText("Note"))
    expect(onPageTypeChange).toHaveBeenCalledTimes(1)
    expect(requireFirst(onPageTypeChange.mock.calls)[0]).toBe("pt-note")
  })

  it("the sub-view exposes a back button that returns to the main menu", () => {
    render(
      <ViewSettingsButton
        {...baseProps}
        pageTypeOptions={pageTypeOptions}
        pageTypeId="pt-task"
        onPageTypeChange={() => {}}
      />
    )
    openPageTypeSubview()
    fireEvent.click(screen.getByRole("button", { name: "Back" }))
    expect(screen.queryByRole("button", { name: "Back" })).toBeNull()
    expect(screen.getByRole("button", { name: /Page Type/i })).toBeDefined()
  })

  it("shows a focused filter for a long page-type list and filters by typing", () => {
    const manyOptions = Array.from({ length: 10 }, (_, i) => ({
      id: `pt-${i}`,
      name: `Type ${i}`,
    }))
    render(
      <ViewSettingsButton
        {...baseProps}
        pageTypeOptions={manyOptions}
        pageTypeId="pt-0"
        onPageTypeChange={() => {}}
      />
    )
    openPageTypeSubview()
    const filter = screen.getByPlaceholderText("Filter...")
    expect(document.activeElement).toBe(filter)
    fireEvent.change(filter, { target: { value: "Type 3" } })
    expect(screen.getByText("Type 3")).toBeDefined()
    const type1 = screen.getByText("Type 1").closest("[data-slot='filterable-list-item']")
    expect(type1?.getAttribute("aria-hidden")).toBe("true")
  })
})
