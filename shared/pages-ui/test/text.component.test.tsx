import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { TextPropertyBadge } from "../src/property-types/text"
import type { PropertyValue } from "../src/property-types/types"
import { requireInput } from "./dom-helpers"

afterEach(() => {
  cleanup()
})

const definition: PropertyDefinition = {
  id: "title",
  title: "Title",
  type: "text",
  config: {},
}

describe("TextPropertyBadge — card context, editable", () => {
  it("renders the value in an editable badge and forwards commits to onPropertyChange", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    const { container } = render(
      <TextPropertyBadge
        property={definition}
        value="hello"
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const input = requireInput(container, 'input[type="text"]')
    expect(input.value).toBe("hello")

    fireEvent.change(input, { target: { value: "updated" } })
    expect(onPropertyChange).not.toHaveBeenCalled()

    fireEvent.blur(input)
    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("title", "updated")
  })

  it("does not fire onPropertyChange when commit value equals the original", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    const { container } = render(
      <TextPropertyBadge
        property={definition}
        value="hello"
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )
    const input = requireInput(container, 'input[type="text"]')
    fireEvent.blur(input)
    expect(onPropertyChange).not.toHaveBeenCalled()
  })

  it("renders a static badge when onPropertyChange is undefined", () => {
    const { container } = render(
      <TextPropertyBadge property={definition} value="hello" context="card" editable />
    )

    expect(container.textContent).toContain("hello")
    expect(container.querySelector("input")).toBeNull()
  })
})

describe("TextPropertyBadge — detail context, editable", () => {
  it("renders the value in an editable badge and forwards commits to onPropertyChange", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    const { container } = render(
      <TextPropertyBadge
        property={definition}
        value="hello"
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const input = requireInput(container, 'input[type="text"]')
    expect(input.value).toBe("hello")

    fireEvent.change(input, { target: { value: "updated" } })
    fireEvent.blur(input)

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("title", "updated")
  })

  it("renders a static badge when onPropertyChange is undefined", () => {
    const { container } = render(
      <TextPropertyBadge property={definition} value="hello" context="detail" editable />
    )

    expect(container.textContent).toContain("hello")
    expect(container.querySelector("input")).toBeNull()
  })
})
