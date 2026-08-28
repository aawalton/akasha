import { describe, expect, it } from "bun:test"
import { asPropertyDefinitionList } from "./page-type-config.ts"

describe("asPropertyDefinitionList — read-boundary validation", () => {
  it("returns the list unchanged when every definition parses cleanly", () => {
    const defs = [
      {
        id: "p1",
        title: "Status",
        type: "select",
        config: { options: [{ id: "open", label: "Open" }] },
        colorRules: [{ when: '{value} == "open"', variant: "green" }],
      },
    ]
    const out = asPropertyDefinitionList(defs)
    expect(out).toHaveLength(1)
    expect(out[0]?.id).toBe("p1")
  })

  it("throws when a colorRule carries a variant outside the BadgeVariant enum", () => {
    const defs = [
      {
        id: "p-bad",
        title: "Status",
        type: "select",
        config: { options: [{ id: "resolved", label: "Resolved" }] },
        colorRules: [{ when: '{value} == "resolved"', variant: "muted" }],
      },
    ]
    expect(() => asPropertyDefinitionList(defs)).toThrow(/p-bad/)
    expect(() => asPropertyDefinitionList(defs)).toThrow(/colorRules/)
  })

  it("throws when a definition is structurally invalid", () => {
    const defs = [{ id: "broken", title: "x", type: "totally-not-a-type" }]
    expect(() => asPropertyDefinitionList(defs)).toThrow()
  })
})
