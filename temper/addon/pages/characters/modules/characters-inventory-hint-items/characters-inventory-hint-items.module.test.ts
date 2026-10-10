import { describe, expect, test } from "bun:test"
import {
  inventoryHintSpecs,
  itemLines,
  itemNote,
} from "akasha/temper/addon/pages/characters/modules/characters-inventory-hint-items/characters-inventory-hint-items.module.code.ts"

const noName = (): string | undefined => undefined

describe("characters-inventory-hint-items", () => {
  test("an item line names the item, its count past one, and its note", () => {
    const lines = itemLines(
      [
        { name: "Spadetail", count: 1, rgb: [1, 1, 1] },
        { name: "Wondrous Nowhere Key", count: 7, note: "Erin" },
      ],
      15
    )
    expect(lines.map((line) => line.text)).toEqual(["Spadetail", "Wondrous Nowhere Key x7 (Erin)"])
    expect(lines[0]?.rgb).toEqual([1, 1, 1])
  })

  test("a list past the cap ends with how many more there are", () => {
    const items = Array.from({ length: 18 }, (_, i) => ({ name: `Item ${i}`, count: 1 }))
    const lines = itemLines(items, 15)
    expect(lines).toHaveLength(16)
    expect(lines[15]?.text).toBe("+3 more")
  })

  test("a note names the character or craft bag, else a verb the line does not already say", () => {
    const erin = (id: string): string | undefined => (id === "42" ? "Erin" : undefined)
    expect(itemNote("character:42", "withdraw", "Bank", erin)).toBe("Erin")
    expect(itemNote("character:7", "withdraw", "Bank", erin)).toBe("another character")
    expect(itemNote("craft-bag", "deposit", "Bank", noName)).toBe("craft bag")
    expect(itemNote("bank", "deposit", "Bank", noName)).toBeUndefined()
    expect(itemNote(undefined, "sell", "Merchant", noName)).toBeUndefined()
    expect(itemNote(undefined, "deconstruct", "Deconstruct", noName)).toBeUndefined()
    expect(itemNote(undefined, "launder", "Fence", noName)).toBe("launder")
  })

  test("a click expands a line into its items and a second click folds it", () => {
    const lines = [
      {
        text: "Bank — 2 items",
        venue: "Bank",
        items: [
          { name: "A", count: 1 },
          { name: "B", count: 2 },
        ],
      },
      { text: "Next: Erin" },
    ]
    const folded = inventoryHintSpecs(lines)
    expect(folded.map((spec) => spec.text)).toEqual(["Bank — 2 items", "Next: Erin"])
    expect(folded[1]?.onClick).toBeUndefined()

    folded[0]?.onClick?.()
    expect(inventoryHintSpecs(lines).map((spec) => spec.text)).toEqual([
      "Bank — 2 items",
      "A",
      "B x2",
      "Next: Erin",
    ])

    inventoryHintSpecs(lines)[0]?.onClick?.()
    expect(inventoryHintSpecs(lines)).toHaveLength(2)
  })

  test("a line that goes away forgets that it was expanded", () => {
    const bank = { text: "Bank — 1 items", venue: "Bank", items: [{ name: "A", count: 1 }] }
    inventoryHintSpecs([bank])[0]?.onClick?.()
    expect(inventoryHintSpecs([bank])).toHaveLength(2)
    inventoryHintSpecs([])
    expect(inventoryHintSpecs([bank])).toHaveLength(1)
  })
})
