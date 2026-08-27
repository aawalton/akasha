import { describe, expect, test } from "bun:test"
import { applyDrop, pickerCandidates, removeFromTeam, reorderTeam } from "./lineup-slots-draft"

describe("lineup-slots-draft — applyDrop", () => {
  test("appends a picked slug to the first free slot", () => {
    expect(applyDrop(["aura"], "abby", 3)).toEqual(["aura", "abby"])
  })

  test("a slug already seated is a no-op (no duplicate seat)", () => {
    const working = ["aura", "abby"]
    expect(applyDrop(working, "aura", 3)).toBe(working)
  })

  test("an add over the seat cap is a no-op", () => {
    const working = ["aura", "abby", "ali"]
    expect(applyDrop(working, "amy", 3)).toBe(working)
  })
})

describe("lineup-slots-draft — removeFromTeam", () => {
  test("removes the card's own slug wherever it sits", () => {
    expect(removeFromTeam(["aura", "abby", "ali"], "abby")).toEqual(["aura", "ali"])
  })

  test("a slug not on the team is a no-op", () => {
    const working = ["aura", "abby"]
    expect(removeFromTeam(working, "amy")).toBe(working)
  })
})

describe("lineup-slots-draft — reorderTeam (arrayMove)", () => {
  test("moves a card down: earlier index to a later one", () => {
    expect(reorderTeam(["aura", "abby", "ali"], 0, 2)).toEqual(["abby", "ali", "aura"])
  })

  test("moves a card up: later index to an earlier one", () => {
    expect(reorderTeam(["aura", "abby", "ali"], 2, 0)).toEqual(["ali", "aura", "abby"])
  })

  test("an adjacent move swaps only the two neighbours", () => {
    expect(reorderTeam(["aura", "abby", "ali"], 1, 2)).toEqual(["aura", "ali", "abby"])
  })

  test("from === to is a no-op (same reference)", () => {
    const working = ["aura", "abby"]
    expect(reorderTeam(working, 1, 1)).toBe(working)
  })

  test("an out-of-range index on either side is a no-op", () => {
    const working = ["aura", "abby"]
    expect(reorderTeam(working, 0, 2)).toBe(working)
    expect(reorderTeam(working, -1, 1)).toBe(working)
    expect(reorderTeam(working, 5, 0)).toBe(working)
  })
})

describe("lineup-slots-draft — pickerCandidates", () => {
  test("keeps unlocked members not already seated, in input order", () => {
    const unlocked = [{ slug: "aura" }, { slug: "abby" }, { slug: "ali" }]
    expect(pickerCandidates(unlocked, ["abby"])).toEqual([{ slug: "aura" }, { slug: "ali" }])
  })

  test("an empty active team yields every unlocked member", () => {
    const unlocked = [{ slug: "aura" }, { slug: "abby" }]
    expect(pickerCandidates(unlocked, [])).toEqual(unlocked)
  })

  test("a fully-seated roster yields no candidates", () => {
    const unlocked = [{ slug: "aura" }, { slug: "abby" }]
    expect(pickerCandidates(unlocked, ["aura", "abby"])).toEqual([])
  })
})
