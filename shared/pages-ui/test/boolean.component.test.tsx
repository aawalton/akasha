import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { BooleanPropertyBadge } from "../src/property-types/boolean"
import type { PropertyValue } from "../src/property-types/types"

afterEach(() => {
  cleanup()
})

const definition: PropertyDefinition = {
  id: "done",
  title: "Done",
  type: "boolean",
  config: {},
}

describe("BooleanPropertyBadge — card context", () => {
  it("toggles true → false on click", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <BooleanPropertyBadge
        property={definition}
        value={true}
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const node = screen.getByRole("checkbox", { name: "Done" })
    fireEvent.click(node)

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("done", false)
  })

  it("toggles false → true on click", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <BooleanPropertyBadge
        property={definition}
        value={false}
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const node = screen.getByRole("checkbox", { name: "Done" })
    fireEvent.click(node)

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("done", true)
  })

  it("falls back to read-only CheckboxBadge when onPropertyChange is undefined", () => {
    render(<BooleanPropertyBadge property={definition} value={true} context="card" editable />)

    const node = screen.getByRole("checkbox", { name: "Done" })
    expect(node.getAttribute("aria-checked")).toBe("true")
    expect(node.getAttribute("aria-readonly")).toBe("true")
    expect(node.getAttribute("tabindex")).toBeNull()
  })
})

describe("BooleanPropertyBadge — detail context", () => {
  it("toggles true → false on click", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <BooleanPropertyBadge
        property={definition}
        value={true}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const node = screen.getByRole("checkbox", { name: "Done" })
    fireEvent.click(node)

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("done", false)
  })

  it("toggles false → true on click", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <BooleanPropertyBadge
        property={definition}
        value={false}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const node = screen.getByRole("checkbox", { name: "Done" })
    fireEvent.click(node)

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("done", true)
  })

  it("falls back to read-only CheckboxBadge when onPropertyChange is undefined", () => {
    render(<BooleanPropertyBadge property={definition} value={true} context="detail" editable />)

    const node = screen.getByRole("checkbox", { name: "Done" })
    expect(node.getAttribute("aria-checked")).toBe("true")
    expect(node.getAttribute("aria-readonly")).toBe("true")
    expect(node.getAttribute("tabindex")).toBeNull()
  })
})
