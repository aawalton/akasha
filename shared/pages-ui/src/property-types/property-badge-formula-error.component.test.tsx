import { afterEach, describe, expect, it } from "bun:test"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { resolveComputedProperties } from "@shared/pages-core/formula/resolve"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { PropertyBadge } from "./property-badge"

afterEach(() => {
  cleanup()
})

const computedNumber: PropertyDefinition = {
  id: "score",
  title: "Score",
  type: "number",
  config: { expression: "prop(a) + prop(b)" },
}

describe("PropertyBadge — an evaluation failure on a computed property", () => {
  it("badges a failure as Error rather than as the type the property holds", () => {
    const failed = { __formulaError: "Unknown function boom", code: "parse_error" }
    render(<PropertyBadge property={computedNumber} value={failed} context="card" />)
    expect(screen.getByText("Error")).not.toBeNull()
    expect(screen.getByTitle("Unknown function boom")).not.toBeNull()
  })

  it("badges a value that did evaluate as the type the property holds", () => {
    render(<PropertyBadge property={computedNumber} value={7} context="card" />)
    expect(screen.getByText("7")).not.toBeNull()
    expect(screen.queryByText("Error")).toBeNull()
  })

  it("surfaces a failure the resolver itself hands back", () => {
    const broken: PropertyDefinition = {
      id: "broken",
      title: "Broken",
      type: "number",
      config: { expression: "1 +" },
    }
    const resolved = resolveComputedProperties({}, [broken])
    render(<PropertyBadge property={broken} value={resolved.broken} context="card" />)
    expect(screen.getByText("Error")).not.toBeNull()
  })

  it("leaves a property carrying no expression to the badge for its own type", () => {
    const plain: PropertyDefinition = { id: "n", title: "N", type: "number", config: {} }
    render(<PropertyBadge property={plain} value={12} context="card" />)
    expect(screen.getByText("12")).not.toBeNull()
    expect(screen.queryByText("Error")).toBeNull()
  })
})
