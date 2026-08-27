import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { PropertyBadge } from "../src/property-types/property-badge"
import { SelectPropertyBadge } from "../src/property-types/select"
import type { PropertyValue } from "../src/property-types/types"

afterEach(() => {
  cleanup()
})

const definition: PropertyDefinition = {
  id: "stat",
  title: "Status",
  type: "select",
  config: {
    options: [
      { id: "a", label: "A" },
      { id: "b", label: "B" },
    ],
  },
}

function openTrigger(el: HTMLElement) {
  fireEvent.pointerDown(el, { button: 0, ctrlKey: false })
  fireEvent.click(el)
}

describe("SelectPropertyBadge — card context, editable", () => {
  it("opens dropdown and forwards selection to onPropertyChange", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue, _ts?: number) => {})

    render(
      <SelectPropertyBadge
        property={definition}
        value="a"
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    expect(screen.getByText("A")).toBeDefined()

    openTrigger(screen.getByRole("button"))

    expect(screen.getAllByText("A").length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText("B")).toBeDefined()

    fireEvent.click(screen.getByText("B"))

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("stat", "b", expect.any(Number))
  })

  it("falls back to static badge when onPropertyChange is undefined", () => {
    const { container } = render(
      <SelectPropertyBadge property={definition} value="a" context="card" editable />
    )

    expect(container.querySelector('[role="button"]')).toBeNull()
    expect(screen.getByText("A")).toBeDefined()
  })
})

describe("SelectPropertyBadge — detail context, editable", () => {
  it("opens dropdown and forwards selection to onPropertyChange", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue, _ts?: number) => {})

    render(
      <SelectPropertyBadge
        property={definition}
        value="a"
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    expect(screen.getByText("A")).toBeDefined()

    openTrigger(screen.getByRole("button"))

    expect(screen.getByText("B")).toBeDefined()

    fireEvent.click(screen.getByText("B"))

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("stat", "b", expect.any(Number))
  })

  it("renders 'Empty' placeholder when value is null and editable", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue, _ts?: number) => {})

    render(
      <SelectPropertyBadge
        property={definition}
        value={null}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    expect(screen.getByText("Empty")).toBeDefined()

    openTrigger(screen.getByRole("button"))
    fireEvent.click(screen.getByText("A"))

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("stat", "a", expect.any(Number))
  })

  it("falls back to static badge when onPropertyChange is undefined", () => {
    const { container } = render(
      <SelectPropertyBadge property={definition} value="a" context="detail" editable />
    )

    expect(container.querySelector('[role="button"]')).toBeNull()
    expect(screen.getByText("A")).toBeDefined()
  })
})

describe("PropertyBadge dispatcher — select align", () => {
  it("card context uses align='start' on the dropdown content", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue, _ts?: number) => {})

    render(
      <PropertyBadge
        property={definition}
        value="a"
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    openTrigger(screen.getByRole("button"))

    const content = document.querySelector('[data-slot="dropdown-menu-content"]')
    expect(content).not.toBeNull()
    expect(content?.getAttribute("data-align")).toBe("start")
  })

  it("detail context uses align='end' on the dropdown content", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue, _ts?: number) => {})

    render(
      <PropertyBadge
        property={definition}
        value="a"
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    openTrigger(screen.getByRole("button"))

    const content = document.querySelector('[data-slot="dropdown-menu-content"]')
    expect(content).not.toBeNull()
    expect(content?.getAttribute("data-align")).toBe("end")
  })
})
