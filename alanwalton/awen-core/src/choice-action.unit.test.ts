import { describe, expect, it } from "bun:test"
import { formatPlayerChoiceAction, PlayerChoiceActionSchema } from "./choice-action"

describe("PlayerChoiceActionSchema", () => {
  it("accepts a full structured action", () => {
    const a = { windowId: "w1", choiceId: "c1", optionId: "ironhide" }
    expect(PlayerChoiceActionSchema.parse(a)).toEqual(a)
  })

  it("rejects an empty id (every id must locate its target)", () => {
    expect(() =>
      PlayerChoiceActionSchema.parse({ windowId: "", choiceId: "c1", optionId: "o1" })
    ).toThrow()
  })

  it("rejects a stray key (strict)", () => {
    expect(() =>
      PlayerChoiceActionSchema.parse({ windowId: "w1", choiceId: "c1", optionId: "o1", extra: 1 })
    ).toThrow()
  })
})

describe("formatPlayerChoiceAction", () => {
  it("serializes the canonical line: label leads, structured tail follows", () => {
    const line = formatPlayerChoiceAction(
      { windowId: "w1", choiceId: "perk-1", optionId: "ironhide" },
      "Ironhide"
    )
    expect(line).toBe('Selected "Ironhide" ⟨window:w1 choice:perk-1 option:ironhide⟩')
  })

  it("throws on a malformed payload (validated before it reaches the wire)", () => {
    expect(() =>
      // @ts-expect-error — deliberately missing optionId
      formatPlayerChoiceAction({ windowId: "w1", choiceId: "c1" }, "X")
    ).toThrow()
  })
})
