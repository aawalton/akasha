import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { JsonPropertyBadge } from "../src/property-types/json"
import type { PropertyValue } from "../src/property-types/types"
import { asTextarea, requireTextarea } from "./dom-helpers"

afterEach(() => {
  cleanup()
})

const definition: PropertyDefinition = Object.assign(
  {
    id: "meta",
    title: "Meta",
    type: "json" as const,
  },
  { name: "Meta" }
)

describe("JsonPropertyBadge — card context", () => {
  it("renders `{name}: {N chars}` and calls onCardNavigate on click", () => {
    const onCardNavigate = mock(() => {})
    const value = { a: 1 }

    render(
      <JsonPropertyBadge
        property={definition}
        value={value}
        context="card"
        onCardNavigate={onCardNavigate}
      />
    )

    const badge = screen.getByRole("button")
    expect(badge.textContent).toContain("Meta")
    expect(badge.textContent).toContain("7")

    fireEvent.click(badge)
    expect(onCardNavigate).toHaveBeenCalledTimes(1)
    expect(onCardNavigate).toHaveBeenCalledWith()
  })

  it("renders a non-clickable badge when onCardNavigate is undefined", () => {
    const value = { a: 1 }

    render(<JsonPropertyBadge property={definition} value={value} context="card" />)

    expect(screen.queryByRole("button")).toBeNull()
    expect(screen.getByText(/Meta/)).toBeDefined()
  })
})

describe("JsonPropertyBadge — detail context, editable", () => {
  it("shows stringified JSON in a <pre> by default", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})
    const value = { a: 1 }

    const { container } = render(
      <JsonPropertyBadge
        property={definition}
        value={value}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const pre = container.querySelector("pre")
    expect(pre).not.toBeNull()
    expect(pre?.textContent).toContain('"a": 1')
    expect(container.querySelector("textarea")).toBeNull()
  })

  it("switches to a textarea on click", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})
    const value = { a: 1 }

    const { container } = render(
      <JsonPropertyBadge
        property={definition}
        value={value}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const pre = container.querySelector("pre")
    expect(pre).not.toBeNull()
    if (pre) fireEvent.click(pre)

    const textarea = asTextarea(container.querySelector("textarea"))
    expect(textarea.value).toBe(JSON.stringify(value, null, 2))
  })

  it("calls onPropertyChange with parsed value on blur with valid JSON", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})
    const value = { a: 1 }

    const { container } = render(
      <JsonPropertyBadge
        property={definition}
        value={value}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const pre = container.querySelector("pre")
    if (pre) fireEvent.click(pre)

    const textarea = requireTextarea(container, "textarea")
    fireEvent.change(textarea, { target: { value: '{"b":2}' } })
    fireEvent.blur(textarea)

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("meta", { b: 2 })
  })

  it("does NOT call onPropertyChange on blur with invalid JSON", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})
    const value = { a: 1 }

    const { container } = render(
      <JsonPropertyBadge
        property={definition}
        value={value}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    const pre = container.querySelector("pre")
    if (pre) fireEvent.click(pre)

    const textarea = requireTextarea(container, "textarea")
    fireEvent.change(textarea, { target: { value: "{not valid}" } })
    fireEvent.blur(textarea)

    expect(onPropertyChange).not.toHaveBeenCalled()
  })

  it("falls back to read-only <pre> when onPropertyChange is undefined", () => {
    const value = { a: 1 }

    const { container } = render(
      <JsonPropertyBadge property={definition} value={value} context="detail" editable />
    )

    const pre = container.querySelector("pre")
    expect(pre).not.toBeNull()
    if (pre) fireEvent.click(pre)
    expect(container.querySelector("textarea")).toBeNull()
  })
})
