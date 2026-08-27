import { afterEach, describe, expect, it } from "bun:test"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { MarkdownPropertyBadge } from "./markdown"

const PROP: PropertyDefinition = {
  id: "alanNotes",
  title: "Alan Notes",
  type: "markdown",
  config: {},
} satisfies PropertyDefinition

afterEach(cleanup)

describe("MarkdownPropertyBadge — empty editable scratch-pad", () => {
  it("renders a reachable click-to-edit target with a placeholder when empty", () => {
    render(
      <MarkdownPropertyBadge
        property={PROP}
        value=""
        context="detail"
        editable
        onPropertyChange={() => {}}
      />
    )
    const target = screen.getByRole("button", { name: "Click to edit" })
    expect(target.textContent).toContain("Enter markdown...")
    expect(target.className).toContain("min-h-")
  })

  it("clicking the empty region enters edit mode (reveals a textarea)", () => {
    render(
      <MarkdownPropertyBadge
        property={PROP}
        value=""
        context="detail"
        editable
        onPropertyChange={() => {}}
      />
    )
    fireEvent.click(screen.getByRole("button", { name: "Click to edit" }))
    expect(screen.getByPlaceholderText("Enter markdown...")).toBeTruthy()
  })

  it("a non-empty value renders its markdown, not the placeholder", () => {
    render(
      <MarkdownPropertyBadge
        property={PROP}
        value="# Heading"
        context="detail"
        editable
        onPropertyChange={() => {}}
      />
    )
    const target = screen.getByRole("button", { name: "Click to edit" })
    expect(target.textContent).toContain("Heading")
    expect(target.className).not.toContain("min-h-")
  })
})

describe("MarkdownPropertyBadge — blur commits the edit", () => {
  it("typing then blurring commits the typed value via onPropertyChange", () => {
    const calls: Array<{ id: string; next: string }> = []
    render(
      <MarkdownPropertyBadge
        property={PROP}
        value="seed"
        context="detail"
        editable
        onPropertyChange={(id, next) => calls.push({ id, next: String(next) })}
      />
    )
    fireEvent.click(screen.getByRole("button", { name: "Click to edit" }))
    const textarea = screen.getByPlaceholderText("Enter markdown...")
    fireEvent.change(textarea, { target: { value: "seed and more" } })
    fireEvent.blur(textarea)
    expect(calls).toEqual([{ id: "alanNotes", next: "seed and more" }])
  })

  it("blurring an unchanged draft does not fire onPropertyChange", () => {
    const calls: string[] = []
    render(
      <MarkdownPropertyBadge
        property={PROP}
        value="seed"
        context="detail"
        editable
        onPropertyChange={(_id, next) => calls.push(String(next))}
      />
    )
    fireEvent.click(screen.getByRole("button", { name: "Click to edit" }))
    fireEvent.blur(screen.getByPlaceholderText("Enter markdown..."))
    expect(calls).toEqual([])
  })
})
