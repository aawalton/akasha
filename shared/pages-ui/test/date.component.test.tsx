import { afterEach, describe, expect, it, mock } from "bun:test"
import { requireFirst } from "@shared/utils-narrow/require-first"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { DatePropertyBadge } from "../src/property-types/date"
import type { PropertyValue } from "../src/property-types/types"

afterEach(() => {
  cleanup()
})

function expectStringValue(v: PropertyValue, label: string): string {
  if (typeof v !== "string") {
    throw new Error(`${label}: expected string, got ${typeof v}`)
  }
  return v
}

const definition: PropertyDefinition = {
  id: "due",
  title: "Due",
  type: "calendar-date",
  config: {},
}

const SAMPLE_DATE = "2025-04-27"

describe("DatePropertyBadge — card context, editable", () => {
  it("clicking the trigger opens the date picker popover", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <DatePropertyBadge
        property={definition}
        value={SAMPLE_DATE}
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    expect(document.querySelector('[data-slot="popover-content"]')).toBeNull()

    fireEvent.click(screen.getByRole("button"))

    expect(document.querySelector('[data-slot="popover-content"]')).not.toBeNull()
  })

  it("selecting a day calls onPropertyChange with the new ISO date string", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <DatePropertyBadge
        property={definition}
        value={SAMPLE_DATE}
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    fireEvent.click(screen.getByRole("button"))

    const dayButtons = Array.from(document.querySelectorAll<HTMLElement>("button[data-day]"))
    const nonSelected = dayButtons.find((b) => b.getAttribute("data-selected-single") !== "true")
    if (nonSelected === undefined) throw new Error("expected non-selected day button")
    fireEvent.click(nonSelected)

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    const [propId, rawIso] = requireFirst(onPropertyChange.mock.calls)
    const isoDate = expectStringValue(rawIso, "onPropertyChange iso arg")
    expect(propId).toBe("due")
    expect(isoDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(isoDate).not.toBe(SAMPLE_DATE)
  })

  it("falls back to read-only badge when onPropertyChange is undefined", () => {
    const { container } = render(
      <DatePropertyBadge property={definition} value={SAMPLE_DATE} context="card" editable />
    )

    expect(container.querySelector('[data-slot="popover-trigger"]')).toBeNull()
  })
})

describe("DatePropertyBadge — detail context, editable", () => {
  it("clicking the trigger opens the date picker popover", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <DatePropertyBadge
        property={definition}
        value={SAMPLE_DATE}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    expect(document.querySelector('[data-slot="popover-content"]')).toBeNull()

    fireEvent.click(screen.getByRole("button"))

    expect(document.querySelector('[data-slot="popover-content"]')).not.toBeNull()
  })

  it("selecting a day calls onPropertyChange with the new ISO date string", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <DatePropertyBadge
        property={definition}
        value={SAMPLE_DATE}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    fireEvent.click(screen.getByRole("button"))

    const dayButtons = Array.from(document.querySelectorAll<HTMLElement>("button[data-day]"))
    const nonSelected = dayButtons.find((b) => b.getAttribute("data-selected-single") !== "true")
    if (nonSelected === undefined) throw new Error("expected non-selected day button")
    fireEvent.click(nonSelected)

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    const [propId, rawIso] = requireFirst(onPropertyChange.mock.calls)
    const isoDate = expectStringValue(rawIso, "onPropertyChange iso arg")
    expect(propId).toBe("due")
    expect(isoDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(isoDate).not.toBe(SAMPLE_DATE)
  })

  it("falls back to read-only badge when onPropertyChange is undefined", () => {
    const { container } = render(
      <DatePropertyBadge property={definition} value={SAMPLE_DATE} context="detail" editable />
    )

    expect(container.querySelector('[data-slot="popover-trigger"]')).toBeNull()
  })
})
