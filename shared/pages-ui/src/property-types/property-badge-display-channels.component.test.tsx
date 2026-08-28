import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { PropertyBadge } from "./property-badge.tsx"

afterEach(() => {
  cleanup()
})

const selectDef: PropertyDefinition = {
  id: "status",
  title: "Status",
  type: "select",
  config: {
    options: [
      { id: "open", label: "Open" },
      { id: "done", label: "Done" },
    ],
  },
}

describe("PropertyBadge dispatcher — badge display channels (#14140)", () => {
  it("renders a declared config.icon as an svg inside the badge pill, before the value", () => {
    const def: PropertyDefinition = {
      id: "n",
      title: "N",
      type: "number",
      config: { icon: "coins" },
    }
    render(<PropertyBadge property={def} value={42} context="card" />)
    const valueNode = screen.getByText("42")
    const badgeRoot = valueNode.closest<HTMLElement>("[data-slot=badge]")
    expect(badgeRoot).not.toBeNull()
    if (badgeRoot === null) return
    const svg = badgeRoot.querySelector("svg")
    expect(svg).not.toBeNull()
    if (svg === null) return
    expect(svg.parentElement).toBe(badgeRoot)
    expect(badgeRoot.firstElementChild).toBe(svg)
  })

  it("applies a declared config.badgeVariant to a number badge", () => {
    const def: PropertyDefinition = {
      id: "n",
      title: "N",
      type: "number",
      config: { badgeVariant: "yellow" },
    }
    render(<PropertyBadge property={def} value={42} context="card" />)
    const badgeRoot = screen.getByText("42").closest<HTMLElement>("[data-slot=badge]")
    expect(badgeRoot?.className ?? "").toContain("text-yellow")
  })

  it("applies a declared config.badgeVariant to a text badge", () => {
    const def: PropertyDefinition = {
      id: "label",
      title: "Label",
      type: "text",
      config: { badgeVariant: "purple" },
    }
    render(<PropertyBadge property={def} value="HELLO_TEXT" context="card" />)
    const badgeRoot = screen.getByText("HELLO_TEXT").closest<HTMLElement>("[data-slot=badge]")
    expect(badgeRoot?.className ?? "").toContain("text-purple")
  })

  it("composes icon + badgeVariant with compact format, units, and prefix", () => {
    const def: PropertyDefinition = {
      id: "gold",
      title: "Gold",
      type: "number",
      config: {
        format: "compact",
        decimals: 1,
        units: "g",
        prefix: "~",
        icon: "coins",
        badgeVariant: "yellow",
      },
    }
    render(<PropertyBadge property={def} value={1234} context="card" />)
    const valueNode = screen.getByText("~1.2K g")
    const badgeRoot = valueNode.closest<HTMLElement>("[data-slot=badge]")
    expect(badgeRoot?.className ?? "").toContain("text-yellow")
    expect(badgeRoot?.querySelector("svg")).not.toBeNull()
  })

  it("colorRules still win over the static badgeVariant (additive precedence)", () => {
    const def: PropertyDefinition = {
      id: "n",
      title: "N",
      type: "number",
      config: { badgeVariant: "green" },
      colorRules: [{ when: "{value} > 10", variant: "red" }],
    }
    render(<PropertyBadge property={def} value={20} context="card" pageData={{ n: 20 }} />)
    const badgeRoot = screen.getByText("20").closest<HTMLElement>("[data-slot=badge]")
    expect(badgeRoot?.className ?? "").toContain("text-red")
    expect(badgeRoot?.className ?? "").not.toContain("text-green")
  })

  it("falls back to the static badgeVariant when no colorRule matches", () => {
    const def: PropertyDefinition = {
      id: "n",
      title: "N",
      type: "number",
      config: { badgeVariant: "green" },
      colorRules: [{ when: "{value} > 10", variant: "red" }],
    }
    render(<PropertyBadge property={def} value={5} context="card" pageData={{ n: 5 }} />)
    const badgeRoot = screen.getByText("5").closest<HTMLElement>("[data-slot=badge]")
    expect(badgeRoot?.className ?? "").toContain("text-green")
  })

  it("formula returnType=number passes icon + badgeVariant + compact through to the resolved badge", () => {
    const def: PropertyDefinition = {
      id: "f",
      title: "F",
      type: "formula",
      config: {
        expression: "x",
        returnType: "number",
        format: "compact",
        decimals: 1,
        units: "g",
        icon: "zap",
        badgeVariant: "blue",
      },
    }
    render(<PropertyBadge property={def} value={5600} context="card" />)
    const valueNode = screen.getByText("5.6K g")
    const badgeRoot = valueNode.closest<HTMLElement>("[data-slot=badge]")
    expect(badgeRoot?.className ?? "").toContain("text-blue")
    expect(badgeRoot?.querySelector("svg")).not.toBeNull()
  })

  it("inline display renders the value without the declared icon", () => {
    const def: PropertyDefinition = {
      id: "n",
      title: "N",
      type: "number",
      display: "inline",
      config: { icon: "coins" },
    }
    render(<PropertyBadge property={def} value={42} context="card" />)
    const badgeRoot = screen.getByText("42").closest<HTMLElement>("[data-slot=badge]")
    expect(badgeRoot?.querySelector("svg")).toBeNull()
  })
})

describe("PropertyBadge dispatcher — callback forwarding", () => {
  it("forwards onPropertyChange to the dispatched select badge", () => {
    const onPropertyChange = mock((_id: string, _value: unknown) => {})
    render(
      <PropertyBadge
        property={selectDef}
        value="open"
        context="card"
        editable
        onPropertyChange={onPropertyChange}
      />
    )
    const trigger = screen.getByRole("button")
    fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false })
    fireEvent.click(trigger)
    const doneItem = screen.getByText("Done")
    fireEvent.click(doneItem)
    expect(onPropertyChange).toHaveBeenCalledTimes(1)
    const [firstCall] = onPropertyChange.mock.calls
    expect(firstCall?.[0]).toBe("status")
    expect(firstCall?.[1]).toBe("done")
  })
})
