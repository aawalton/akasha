import { afterEach, describe, expect, it } from "bun:test"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { propertyBadgeRegistry } from "./badge-registry"
import { PropertyBadge } from "./property-badge"

afterEach(() => {
  cleanup()
})

const ALL_PROPERTY_TYPES = [
  "text",
  "markdown",
  "number",
  "select",
  "multi-select",
  "path-select",
  "calendar-date",
  "calendar-time",
  "instant",
  "boolean",
  "url",
  "relation",
  "multi-relation",
  "rollup",
  "aggregate",
  "formula",
  "json",
  "rrule",
  "progress",
  "rich-document",
  "action-button",
] as const

const textDef: PropertyDefinition = {
  id: "foo",
  title: "Foo",
  type: "text",
  config: {},
}

const multiSelectDef: PropertyDefinition = {
  id: "tags",
  title: "Tags",
  type: "multi-select",
  config: { options: [{ id: "a", label: "A" }] },
}

const selectDef: PropertyDefinition = {
  id: "status",
  title: "Status",
  type: "select",
  config: {
    options: [
      { id: "open", label: "Open" },
      { id: "done", label: "Done" },
    ],
  },
}

describe("PropertyBadge dispatcher — empty short-circuit", () => {
  it("renders <EmptyBadge /> ('Empty' literal) when value is null", () => {
    render(<PropertyBadge property={textDef} value={null} context="card" />)
    expect(screen.getByText("Empty")).toBeDefined()
    expect(screen.queryByText("FOO_TEXT")).toBeNull()
  })

  it("renders <EmptyBadge /> when a multi-select value is an empty array", () => {
    render(<PropertyBadge property={multiSelectDef} value={[]} context="card" />)
    expect(screen.getByText("Empty")).toBeDefined()
  })
})

describe("PropertyBadge dispatcher — type dispatch", () => {
  it("dispatches a non-empty text value to TextPropertyBadge (text content reaches the DOM)", () => {
    render(<PropertyBadge property={textDef} value="HELLO_TEXT" context="card" />)
    expect(screen.getByText("HELLO_TEXT")).toBeDefined()
    expect(screen.queryByText("Empty")).toBeNull()
  })

  it("dispatches a non-empty select value to SelectPropertyBadge (option label reaches the DOM)", () => {
    render(<PropertyBadge property={selectDef} value="open" context="card" />)
    expect(screen.getByText("Open")).toBeDefined()
  })
})

describe("PropertyBadge dispatcher — layout context (truncation)", () => {
  it("applies fixed truncation in card context (max-w-32 on the rendered badge)", () => {
    render(<PropertyBadge property={textDef} value="HELLO_TEXT" context="card" />)
    const valueNode = screen.getByText("HELLO_TEXT")
    const badgeRoot = valueNode.closest<HTMLElement>("[data-slot=badge]")
    expect(badgeRoot).not.toBeNull()
    expect(badgeRoot?.className ?? "").toContain("max-w-32")
  })

  it("applies fluid truncation in detail context (no max-w-32)", () => {
    render(<PropertyBadge property={textDef} value="HELLO_TEXT" context="detail" />)
    const valueNode = screen.getByText("HELLO_TEXT")
    const badgeRoot = valueNode.closest<HTMLElement>("[data-slot=badge]")
    expect(badgeRoot).not.toBeNull()
    expect(badgeRoot?.className ?? "").not.toContain("max-w-32")
  })
})

describe("PropertyBadge dispatcher — inline display option", () => {
  it("renders chrome-less (no pill background/padding/rounded/max-width) when property.display is 'inline'", () => {
    const inlineDef: PropertyDefinition = { ...textDef, display: "inline" }
    render(<PropertyBadge property={inlineDef} value="HELLO_TEXT" context="card" />)
    const valueNode = screen.getByText("HELLO_TEXT")
    const badgeRoot = valueNode.closest<HTMLElement>("[data-slot=badge]")
    expect(badgeRoot).not.toBeNull()
    const cls = badgeRoot?.className ?? ""
    expect(cls).not.toContain("rounded-md")
    expect(cls).not.toContain("px-2")
    expect(cls).not.toContain("max-w-32")
  })

  it("renders standard badge chrome when property.display is 'badge'", () => {
    const badgeDef: PropertyDefinition = { ...textDef, display: "badge" }
    render(<PropertyBadge property={badgeDef} value="HELLO_TEXT" context="card" />)
    const valueNode = screen.getByText("HELLO_TEXT")
    const badgeRoot = valueNode.closest<HTMLElement>("[data-slot=badge]")
    expect(badgeRoot?.className ?? "").toContain("rounded-md")
  })

  it("defaults to badge chrome when property.display is absent", () => {
    render(<PropertyBadge property={textDef} value="HELLO_TEXT" context="card" />)
    const valueNode = screen.getByText("HELLO_TEXT")
    const badgeRoot = valueNode.closest<HTMLElement>("[data-slot=badge]")
    expect(badgeRoot?.className ?? "").toContain("rounded-md")
  })
})

describe("PropertyBadge dispatcher — registry exhaustiveness", () => {
  it("propertyBadgeRegistry covers every PropertyType literal", () => {
    expect(Object.keys(propertyBadgeRegistry).sort()).toEqual([...ALL_PROPERTY_TYPES].sort())
  })
})
