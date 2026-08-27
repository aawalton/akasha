import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { CalendarTimePropertyBadge } from "../src/property-types/calendar-time"
import type { PropertyValue } from "../src/property-types/types"
import { requireElement } from "./dom-helpers"

afterEach(() => {
  cleanup()
})

const definition: PropertyDefinition = {
  id: "due-time",
  title: "Due Time",
  type: "calendar-time",
  config: {},
}

const SAMPLE_TIME = "14:30"

describe("CalendarTimePropertyBadge — read-only", () => {
  it("formats valid HH:MM as 12-hour AM/PM", () => {
    const { container } = render(
      <CalendarTimePropertyBadge property={definition} value={SAMPLE_TIME} context="card" />
    )
    expect(container.textContent).toContain("2:30 PM")
  })

  it("renders an em-dash for invalid or empty values", () => {
    const a = render(
      <CalendarTimePropertyBadge property={definition} value={null} context="card" />
    )
    expect(a.container.textContent).toBe("—")
    cleanup()
    const b = render(<CalendarTimePropertyBadge property={definition} value="9:5" context="card" />)
    expect(b.container.textContent).toBe("—")
  })
})

describe("CalendarTimePropertyBadge — card context, editable", () => {
  it("renders an editable badge trigger showing formatted time", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    const { container } = render(
      <CalendarTimePropertyBadge
        property={definition}
        value={SAMPLE_TIME}
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const trigger = container.querySelector('button[type="button"]')
    if (trigger === null) throw new Error("expected trigger button to exist")
    expect(trigger.textContent).toContain("2:30 PM")
  })

  it("renders no clear-X button on the card badge", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    const { container } = render(
      <CalendarTimePropertyBadge
        property={definition}
        value={SAMPLE_TIME}
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    expect(container.querySelector('[aria-label="Clear time"]')).toBeNull()
  })

  it("falls back to read-only badge when onPropertyChange is undefined", () => {
    const { container } = render(
      <CalendarTimePropertyBadge
        property={definition}
        value={SAMPLE_TIME}
        context="card"
        editable
      />
    )
    expect(container.querySelector('button[type="button"]')).toBeNull()
    expect(container.textContent).toContain("2:30 PM")
  })
})

describe("CalendarTimePropertyBadge — detail context, editable", () => {
  it("renders an editable badge trigger when onPropertyChange is set", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    const { container } = render(
      <CalendarTimePropertyBadge
        property={definition}
        value={SAMPLE_TIME}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const trigger = container.querySelector('button[type="button"]')
    if (trigger === null) throw new Error("expected trigger button to exist")
    expect(trigger.textContent).toContain("2:30 PM")
  })

  it("falls back to read-only badge when onPropertyChange is undefined", () => {
    const { container } = render(
      <CalendarTimePropertyBadge
        property={definition}
        value={SAMPLE_TIME}
        context="detail"
        editable
      />
    )
    expect(container.querySelector('button[type="button"]')).toBeNull()
    expect(container.textContent).toContain("2:30 PM")
  })

  it("clearing via the badge remove button fires null", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    const { container } = render(
      <CalendarTimePropertyBadge
        property={definition}
        value={SAMPLE_TIME}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const removeBtn = requireElement(container, '[aria-label="Clear time"]')
    fireEvent.click(removeBtn)
    expect(onPropertyChange).toHaveBeenCalledWith("due-time", null)
  })
})
