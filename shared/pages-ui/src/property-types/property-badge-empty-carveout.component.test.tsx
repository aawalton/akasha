import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PropertyDefinition } from "@shared/pages-core/types"

mock.module("../supabase/use-set-property-optimistic", () => ({
  useSetPropertyOptimistic: () => () => {},
}))

const { PropertyBadge } = await import("./property-badge")

afterEach(() => {
  cleanup()
})

const actionDef: PropertyDefinition = {
  id: "act",
  title: "Do It",
  type: "action-button",
  config: { verbId: "x" },
}

const textDef: PropertyDefinition = {
  id: "foo",
  title: "Foo",
  type: "text",
  config: {},
}

describe("PropertyBadge dispatcher — rendersWhenEmpty carve-out (action-button)", () => {
  it("renders the action-button per-type component (a <button>) for an empty value when not editable", () => {
    render(
      <PropertyBadge
        property={actionDef}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
      />
    )
    expect(screen.getByRole("button")).toBeDefined()
    expect(screen.queryByText("Empty")).toBeNull()
  })

  it("still renders <EmptyBadge /> for a text def with an empty value and no editable (unchanged)", () => {
    render(<PropertyBadge property={textDef} value={null} context="card" />)
    expect(screen.getByText("Empty")).toBeDefined()
    expect(screen.queryByRole("button")).toBeNull()
  })
})

const removeShapedDef: PropertyDefinition = {
  id: "remove",
  title: "Remove",
  type: "action-button",
  config: { verbId: "idle-remove", label: "Remove", icon: "x", badgeVariant: "elevation-muted" },
}

describe("PropertyBadge dispatcher — action-button styling channels reach the DOM (#14779 / #14754)", () => {
  it("paints an elevation-muted action-button as text-secondary with the declared icon svg", () => {
    render(
      <PropertyBadge
        property={removeShapedDef}
        value={null}
        context="card"
        pageId="page_1"
        pageTypeSlug="things"
      />
    )
    const button = screen.getByRole("button")
    expect(button.textContent ?? "").toContain("Remove")
    expect(button.className).toContain("text-secondary")
    const svg = button.querySelector("svg")
    expect(svg).not.toBeNull()
    expect(svg?.getAttribute("class") ?? "").toContain("lucide-x")
  })
})
