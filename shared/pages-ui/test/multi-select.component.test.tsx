import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { MultiSelectPropertyBadge } from "../src/property-types/multi-select"
import type { PropertyValue } from "../src/property-types/types"
import { asHTMLElement, asInput, requireElement } from "./dom-helpers"

afterEach(() => {
  cleanup()
})

const definition: PropertyDefinition = {
  id: "tags",
  title: "Tags",
  type: "multi-select",
  config: {
    options: [
      { id: "a", label: "A" },
      { id: "b", label: "B" },
    ],
  },
}

describe("MultiSelectPropertyBadge — card context, editable", () => {
  it("opens popover and forwards adds to onPropertyChange", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue, _ts?: number) => {})

    render(
      <MultiSelectPropertyBadge
        property={definition}
        value={["a"]}
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    expect(screen.getByText("A")).toBeDefined()

    fireEvent.click(screen.getByRole("button"))

    fireEvent.click(screen.getByText("B"))

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("tags", ["a", "b"], expect.any(Number))
  })

  it("removes a current selection via the X button", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue, _ts?: number) => {})

    render(
      <MultiSelectPropertyBadge
        property={definition}
        value={["a"]}
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    fireEvent.click(screen.getByRole("button"))

    const currentSelections = document.body.querySelector('[data-slot="current-selections"]')
    if (currentSelections === null) throw new Error("expected current-selections to exist")
    const removeBtn = requireElement(currentSelections, '[role="button"]')
    fireEvent.click(removeBtn)

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("tags", [], expect.any(Number))
  })

  it("invokes onCreateOption when typing a new label and pressing Enter", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue, _ts?: number) => {})
    const onCreateOption = mock((_id: string, _label: string) => {})

    render(
      <MultiSelectPropertyBadge
        property={definition}
        value={[]}
        context="card"
        editable
        onPropertyChange={onPropertyChange}
        onCreateOption={onCreateOption}
      />
    )

    fireEvent.click(screen.getByRole("button"))

    const input = asInput(screen.getByPlaceholderText("Search options..."))
    fireEvent.change(input, { target: { value: "Newish" } })
    fireEvent.keyDown(input, { key: "Enter" })

    expect(onCreateOption).toHaveBeenCalledTimes(1)
    expect(onCreateOption).toHaveBeenCalledWith("tags", "Newish")
  })

  it("falls back to static badges when onPropertyChange is undefined", () => {
    const { container } = render(
      <MultiSelectPropertyBadge property={definition} value={["a"]} context="card" editable />
    )

    expect(container.querySelector('[role="button"]')).toBeNull()
    expect(screen.getAllByText("A").length).toBeGreaterThan(0)
  })
})

describe("MultiSelectPropertyBadge — detail context, editable", () => {
  it("opens popover and forwards adds to onPropertyChange", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue, _ts?: number) => {})

    render(
      <MultiSelectPropertyBadge
        property={definition}
        value={["a"]}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    expect(screen.getByText("A")).toBeDefined()

    fireEvent.click(screen.getByRole("button"))

    fireEvent.click(screen.getByText("B"))

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("tags", ["a", "b"], expect.any(Number))
  })

  it("removes a current selection via the X button", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue, _ts?: number) => {})

    render(
      <MultiSelectPropertyBadge
        property={definition}
        value={["a", "b"]}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    fireEvent.click(screen.getByRole("button"))

    const currentSelections = document.body.querySelector('[data-slot="current-selections"]')
    if (currentSelections === null) throw new Error("expected current-selections to exist")
    const removeBtns = currentSelections.querySelectorAll('[role="button"]')
    fireEvent.click(asHTMLElement(removeBtns[0]))

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("tags", ["b"], expect.any(Number))
  })

  it("falls back to static badges when onPropertyChange is undefined", () => {
    const { container } = render(
      <MultiSelectPropertyBadge property={definition} value={["a"]} context="detail" editable />
    )

    expect(container.querySelector('[role="button"]')).toBeNull()
    expect(screen.getAllByText("A").length).toBeGreaterThan(0)
  })
})
