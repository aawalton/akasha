import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { NumberPropertyBadge } from "../src/property-types/number.tsx"
import type { PropertyValue } from "../src/property-types/types.ts"
import { asInput } from "./dom-helpers.ts"

afterEach(() => {
  cleanup()
})

const definition: PropertyDefinition = {
  id: "qty",
  title: "Qty",
  type: "number",
  config: {},
}

describe("NumberPropertyBadge — card context, editable", () => {
  it("renders the value as a badge and forwards numeric edits to onPropertyChange", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <NumberPropertyBadge
        property={definition}
        value={42}
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    expect(screen.getByText("42")).toBeDefined()

    fireEvent.click(screen.getByText("42"))
    const input = asInput(screen.getByRole("textbox"))
    fireEvent.change(input, { target: { value: "100" } })
    fireEvent.blur(input)

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("qty", 100)
  })

  it("respects config.prefix when formatting the badge label", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})
    const def: PropertyDefinition = { ...definition, config: { prefix: "$" } }

    render(
      <NumberPropertyBadge
        property={def}
        value={42}
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    expect(screen.getByText("$42")).toBeDefined()
  })

  it("rejects NaN input — onPropertyChange not called for non-numeric drafts", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <NumberPropertyBadge
        property={definition}
        value={42}
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    fireEvent.click(screen.getByText("42"))
    const input = asInput(screen.getByRole("textbox"))
    fireEvent.change(input, { target: { value: "abc" } })
    fireEvent.blur(input)

    expect(onPropertyChange).not.toHaveBeenCalled()
  })

  it("renders a static badge when onPropertyChange is undefined", () => {
    const { container } = render(
      <NumberPropertyBadge property={definition} value={42} context="card" editable />
    )

    expect(container.textContent).toContain("42")
    expect(container.querySelector('button[type="button"]')).toBeNull()
  })

  it("renders an em-dash badge when value is null", () => {
    const { container } = render(
      <NumberPropertyBadge property={definition} value={null} context="card" editable />
    )
    expect(container.textContent).toContain("—")
  })

  it("renders bare digits (no grouping) for format=number at any magnitude", () => {
    const def: PropertyDefinition = { ...definition, config: { format: "number" } }
    const { container } = render(
      <NumberPropertyBadge property={def} value={123456} context="card" />
    )
    expect(container.textContent).toContain("123456")
    expect(container.textContent).not.toContain("123,456")
  })

  it("renders grouped digits for format=number-with-separators", () => {
    const def: PropertyDefinition = {
      ...definition,
      config: { format: "number-with-separators" },
    }
    const { container } = render(
      <NumberPropertyBadge property={def} value={123456} context="card" />
    )
    expect(container.textContent).toContain((123456).toLocaleString())
  })

  it("renders a 0-100 value as a percentage with two decimals for format=percent", () => {
    const def: PropertyDefinition = { ...definition, config: { format: "percent" } }
    const { container } = render(<NumberPropertyBadge property={def} value={42} context="card" />)
    const expected = new Intl.NumberFormat(undefined, {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(0.42)
    expect(container.textContent).toContain(expected)
  })

  it("renders fractional input as a percentage for percentBasis=1 with decimals=0", () => {
    const def: PropertyDefinition = {
      ...definition,
      config: { format: "percent", percentBasis: 1, decimals: 0 },
    }
    const { container } = render(<NumberPropertyBadge property={def} value={0.42} context="card" />)
    const expected = new Intl.NumberFormat(undefined, {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(0.42)
    expect(container.textContent).toContain(expected)
  })
})

describe("NumberPropertyBadge — detail context, editable", () => {
  it("renders the value as a badge and forwards numeric edits to onPropertyChange", () => {
    const onPropertyChange = mock((_id: string, _v: PropertyValue) => {})

    render(
      <NumberPropertyBadge
        property={definition}
        value={42}
        context="detail"
        editable
        onPropertyChange={onPropertyChange}
      />
    )

    expect(screen.getByText("42")).toBeDefined()

    fireEvent.click(screen.getByText("42"))
    const input = asInput(screen.getByRole("textbox"))
    fireEvent.change(input, { target: { value: "100" } })
    fireEvent.blur(input)

    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    expect(onPropertyChange).toHaveBeenCalledWith("qty", 100)
  })

  it("renders a static badge when onPropertyChange is undefined", () => {
    const { container } = render(
      <NumberPropertyBadge property={definition} value={42} context="detail" editable />
    )

    expect(container.textContent).toContain("42")
    expect(container.querySelector('button[type="button"]')).toBeNull()
  })
})

describe("NumberPropertyBadge — colorRules", () => {
  const withRules: PropertyDefinition = {
    ...definition,
    colorRules: [
      { when: "{value} >= 10000", variant: "green" },
      { when: "{value} > 0", variant: "yellow" },
      { when: "true", variant: "red" },
    ],
  }

  it("paints the resolved colorRules variant on the static badge", () => {
    const { container } = render(
      <NumberPropertyBadge property={withRules} value={12000} context="card" />
    )
    expect(container.querySelector('[class*="text-green"]')).not.toBeNull()
  })

  it("evaluates rules in order — first match wins (yellow before the catch-all red)", () => {
    const { container } = render(
      <NumberPropertyBadge property={withRules} value={5000} context="card" />
    )
    expect(container.querySelector('[class*="text-yellow"]')).not.toBeNull()
    expect(container.querySelector('[class*="text-green"]')).toBeNull()
  })

  it("falls back to the accent variant when the property carries no colorRules", () => {
    const { container } = render(
      <NumberPropertyBadge property={definition} value={12000} context="card" />
    )
    expect(container.querySelector('[class*="text-green"]')).toBeNull()
    expect(container.textContent).toContain("12000")
  })
})
