import { afterEach, describe, expect, it } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { PropertyVisibilityPicker } from "./property-visibility-picker"

afterEach(() => {
  cleanup()
})

const eligible = [
  { id: "foo", label: "Foo" },
  { id: "bar", label: "Bar" },
  { id: "baz", label: "Baz" },
]

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

describe("PropertyVisibilityPicker — three-section rendering", () => {
  it("always renders all three section headers, even when a section is empty", () => {
    render(
      <PropertyVisibilityPicker
        eligibleOptions={eligible}
        visibleProperties={[]}
        alwaysShowProperties={[]}
        onVisibilityChange={() => {}}
        onBack={() => {}}
      />
    )
    expect(headingsInOrder()).toEqual([...ALL_HEADINGS])
    expect(rowLabelsInOrder()).toEqual(["Bar", "Baz", "Foo"])
    expect(labelsUnderHeading("Always Show")).toEqual([])
    expect(labelsUnderHeading("Hide When Empty")).toEqual([])
    expect(labelsUnderHeading("Always Hide")).toEqual(["Bar", "Baz", "Foo"])
  })

  it("places each row under the correct section header (split by props)", () => {
    render(
      <PropertyVisibilityPicker
        eligibleOptions={eligible}
        visibleProperties={["foo", "bar"]}
        alwaysShowProperties={["foo"]}
        onVisibilityChange={() => {}}
        onBack={() => {}}
      />
    )
    expect(headingsInOrder()).toEqual([...ALL_HEADINGS])
    expect(labelsUnderHeading("Always Show")).toEqual(["Foo"])
    expect(labelsUnderHeading("Hide When Empty")).toEqual(["Bar"])
    expect(labelsUnderHeading("Always Hide")).toEqual(["Baz"])
    expect(rowLabelsInOrder()).toEqual(["Foo", "Bar", "Baz"])
  })

  it("defaults alwaysShowProperties to [] — all visible ids land in Hide When Empty", () => {
    render(
      <PropertyVisibilityPicker
        eligibleOptions={eligible}
        visibleProperties={["foo", "baz"]}
        onVisibilityChange={() => {}}
        onBack={() => {}}
      />
    )
    expect(headingsInOrder()).toEqual([...ALL_HEADINGS])
    expect(labelsUnderHeading("Always Show")).toEqual([])
    expect(labelsUnderHeading("Hide When Empty")).toEqual(["Foo", "Baz"])
    expect(labelsUnderHeading("Always Hide")).toEqual(["Bar"])
  })
})

describe("PropertyVisibilityPicker — no buttons (pure drag-and-drop)", () => {
  it("renders no per-row mode controls (no radios)", () => {
    render(
      <PropertyVisibilityPicker
        eligibleOptions={eligible}
        visibleProperties={["foo", "bar"]}
        alwaysShowProperties={["foo"]}
        onVisibilityChange={() => {}}
        onBack={() => {}}
      />
    )
    expect(screen.queryAllByRole("radio")).toEqual([])
  })

  it("renders no bulk action buttons", () => {
    render(
      <PropertyVisibilityPicker
        eligibleOptions={eligible}
        visibleProperties={["foo", "bar"]}
        alwaysShowProperties={["foo"]}
        hiddenPropertiesOrder={["baz"]}
        onVisibilityChange={() => {}}
        onBack={() => {}}
      />
    )
    for (const label of ["Hide all", "Show all", "Hide when empty all", "Always hide"]) {
      expect(screen.queryByRole("button", { name: label })).toBeNull()
    }
    const buttonNames = screen
      .getAllByRole("button")
      .map((b) => b.getAttribute("aria-label") ?? b.textContent ?? "")
    expect(buttonNames.some((n) => n.startsWith("Reorder "))).toBe(true)
    expect(buttonNames).toContain("Back")
  })
})

describe("PropertyVisibilityPicker — search", () => {
  const search = (): HTMLInputElement => {
    const el = screen.getByRole("textbox", { name: "Search properties" })
    if (!(el instanceof HTMLInputElement)) {
      throw new Error("expected search to be an HTMLInputElement")
    }
    return el
  }

  it("renders a search input above the rows", () => {
    render(
      <PropertyVisibilityPicker
        eligibleOptions={eligible}
        visibleProperties={[]}
        onVisibilityChange={() => {}}
        onBack={() => {}}
      />
    )
    expect(search()).toBeDefined()
  })

  it("typing filters rows by case-insensitive label substring; headers remain", () => {
    render(
      <PropertyVisibilityPicker
        eligibleOptions={eligible}
        visibleProperties={[]}
        onVisibilityChange={() => {}}
        onBack={() => {}}
      />
    )
    fireEvent.change(search(), { target: { value: "BA" } })
    expect(rowLabelsInOrder()).toEqual(["Bar", "Baz"])
    expect(headingsInOrder()).toEqual([...ALL_HEADINGS])
  })

  it("an empty/whitespace query restores the full list", () => {
    render(
      <PropertyVisibilityPicker
        eligibleOptions={eligible}
        visibleProperties={[]}
        onVisibilityChange={() => {}}
        onBack={() => {}}
      />
    )
    fireEvent.change(search(), { target: { value: "ba" } })
    expect(rowLabelsInOrder()).toEqual(["Bar", "Baz"])
    fireEvent.change(search(), { target: { value: "   " } })
    expect(rowLabelsInOrder()).toEqual(["Bar", "Baz", "Foo"])
  })
})

describe("PropertyVisibilityPicker — drag handles + back-compat", () => {
  it("renders a 'Reorder {label}' grip for every row when onVisibilityChange is provided", () => {
    render(
      <PropertyVisibilityPicker
        eligibleOptions={eligible}
        visibleProperties={["foo"]}
        alwaysShowProperties={["foo"]}
        onVisibilityChange={() => {}}
        onBack={() => {}}
      />
    )
    expect(screen.getByRole("button", { name: "Reorder Foo" })).toBeDefined()
    expect(screen.getByRole("button", { name: "Reorder Bar" })).toBeDefined()
    expect(screen.getByRole("button", { name: "Reorder Baz" })).toBeDefined()
  })

  it("renders grips as static placeholders (no reorder handles) when onVisibilityChange is omitted", () => {
    render(
      <PropertyVisibilityPicker
        eligibleOptions={eligible}
        visibleProperties={["foo"]}
        alwaysShowProperties={["foo"]}
        onBack={() => {}}
      />
    )
    expect(screen.queryByRole("button", { name: "Reorder Foo" })).toBeNull()
    expect(screen.queryByRole("button", { name: "Reorder Bar" })).toBeNull()
    expect(screen.queryByRole("button", { name: "Reorder Baz" })).toBeNull()
    expect(headingsInOrder()).toEqual([...ALL_HEADINGS])
  })
})
