import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { InstantPropertyBadge } from "../src/property-types/instant"
import type { PropertyValue } from "../src/property-types/types"
import { requireInput } from "./dom-helpers"

afterEach(() => {
  cleanup()
})

const definition: PropertyDefinition = {
  id: "ts",
  title: "TS",
  type: "instant",
  config: {},
}

const ISO_VALUE = "2025-04-27T10:00:00Z"

describe("InstantPropertyBadge — card context, editable", () => {
  it("opens the datetime picker on click and forwards changes as ISO timestamps", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <InstantPropertyBadge
        property={definition}
        value={ISO_VALUE}
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const trigger = screen.getByRole("button")
    expect(trigger).toBeDefined()
    fireEvent.click(trigger)

    const input = requireInput(document, 'input[type="datetime-local"]')

    fireEvent.change(input, { target: { value: "2025-05-01T12:30" } })
    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    const firstCall = onPropertyChange.mock.calls[0]
    if (firstCall === undefined) throw new Error("expected onPropertyChange call")
    const [calledId, calledValue] = firstCall
    expect(calledId).toBe("ts")
    expect(typeof calledValue).toBe("string")
    if (typeof calledValue !== "string") throw new Error("expected string value")
    expect(new Date(calledValue).getTime()).toBe(new Date("2025-05-01T12:30").getTime())
  })

  it("falls back to a read-only badge with relative time when onPropertyChange is undefined", () => {
    const { container } = render(
      <InstantPropertyBadge property={definition} value={ISO_VALUE} context="card" editable />
    )

    expect(screen.queryByRole("button")).toBeNull()
    expect((container.textContent ?? "").length).toBeGreaterThan(0)
  })
})

describe("InstantPropertyBadge — detail context, editable", () => {
  it("opens the datetime picker on click and forwards changes as ISO timestamps", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <InstantPropertyBadge
        property={definition}
        value={ISO_VALUE}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const trigger = screen.getByRole("button")
    expect(trigger).toBeDefined()
    fireEvent.click(trigger)

    const input = requireInput(document, 'input[type="datetime-local"]')

    fireEvent.change(input, { target: { value: "2025-05-01T12:30" } })
    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    const firstCall = onPropertyChange.mock.calls[0]
    if (firstCall === undefined) throw new Error("expected onPropertyChange call")
    const [calledId, calledValue] = firstCall
    expect(calledId).toBe("ts")
    expect(typeof calledValue).toBe("string")
    if (typeof calledValue !== "string") throw new Error("expected string value")
    expect(new Date(calledValue).getTime()).toBe(new Date("2025-05-01T12:30").getTime())
  })

  it("falls back to a read-only badge with relative time when onPropertyChange is undefined", () => {
    const { container } = render(
      <InstantPropertyBadge property={definition} value={ISO_VALUE} context="detail" editable />
    )

    expect(screen.queryByRole("button")).toBeNull()
    expect((container.textContent ?? "").length).toBeGreaterThan(0)
  })
})

describe("InstantPropertyBadge — display format config", () => {
  const withFormat = (format: string): PropertyDefinition => ({
    id: "ts",
    title: "TS",
    type: "instant",
    config: { format },
  })

  it("renders relative duration by default (no clock time, no year)", () => {
    const { container } = render(
      <InstantPropertyBadge property={definition} value={ISO_VALUE} context="card" />
    )
    const text = container.textContent ?? ""
    expect(text).not.toContain(":")
    expect(text).not.toContain("2025")
  })

  it("renders a clock time for the absolute-time format", () => {
    const { container } = render(
      <InstantPropertyBadge
        property={withFormat("absolute-time")}
        value={ISO_VALUE}
        context="card"
      />
    )
    const text = container.textContent ?? ""
    expect(text).toContain(":")
    expect(text).not.toContain("2025")
  })

  it("renders a calendar date for the absolute-date format", () => {
    const { container } = render(
      <InstantPropertyBadge
        property={withFormat("absolute-date")}
        value={ISO_VALUE}
        context="card"
      />
    )
    const text = container.textContent ?? ""
    expect(text).toContain("2025")
    expect(text).not.toContain(":")
  })

  it("renders both date and time for the absolute-date-time format", () => {
    const { container } = render(
      <InstantPropertyBadge
        property={withFormat("absolute-date-time")}
        value={ISO_VALUE}
        context="card"
      />
    )
    const text = container.textContent ?? ""
    expect(text).toContain("2025")
    expect(text).toContain(":")
  })
})
