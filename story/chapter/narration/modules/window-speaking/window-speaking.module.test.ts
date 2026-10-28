import { describe, expect, test } from "bun:test"
import {
  spokenLine,
  spokenScreen,
  spokenWindow,
} from "akasha/story/chapter/narration/modules/window-speaking/window-speaking.module.code.ts"

describe("spokenWindow", () => {
  test("a status assessment says its name, its level and each label of its note", () => {
    expect(
      spokenWindow({
        kind: "status-assessment",
        name: "Elsie Fairweather",
        level: 3,
        note: "Class: Enthraller; Experience: 20 / 230; Skills: Captivate, Tether — Tamsin",
      })
    ).toEqual([
      "Status: Elsie Fairweather.",
      "Level 3.",
      "Class, Enthraller.",
      "Experience, 20 of 230.",
      "Skills, Captivate, Tether, Tamsin.",
    ])
  })

  test("a skill says its name and its rank", () => {
    expect(spokenWindow({ kind: "skill", name: "Devotion" })).toEqual(["New skill: Devotion."])
    expect(spokenWindow({ kind: "skill", name: "Smithing", rung: "Apprentice" })).toEqual([
      "New skill: Smithing.",
      "Rank, Apprentice.",
    ])
  })

  test("a skill of an ability kind says that kind's name in place of skill", () => {
    const kinds = new Map([["Path of Endurance", "Path"]])
    expect(spokenWindow({ kind: "skill", name: "Path of Endurance" }, kinds)).toEqual([
      "New path: Path of Endurance.",
    ])
    expect(spokenWindow({ kind: "skill", name: "Smithing" }, kinds)).toEqual([
      "New skill: Smithing.",
    ])
  })

  test("an ability's window says the heading its card shows: Unlocked, Advanced, Completed", () => {
    const path = { kind: "Path", slotted: true, tierSteps: [10, 25, 50] }
    const held = new Map([["Path of Endurance", path]])
    const kinds = new Map([["Path of Endurance", "Path"]])
    const said = (window: { kind: string; name: string; note?: string }) =>
      spokenWindow(window, kinds, held)[0]
    expect(said({ kind: "skill", name: "Path of Endurance" })).toBe(
      "Path Unlocked: Path of Endurance."
    )
    expect(said({ kind: "status-assessment", name: "Path of Endurance", note: "Tier: 2" })).toBe(
      "Path Advanced: Path of Endurance."
    )
    expect(said({ kind: "status-assessment", name: "Path of Endurance", note: "Tier: 3" })).toBe(
      "Path Completed: Path of Endurance."
    )
    expect(said({ kind: "status-assessment", name: "Path of Endurance" })).toBe(
      "Status: Path of Endurance."
    )
    expect(
      spokenWindow(
        { kind: "item-award", name: "Reward", note: "Path: Path of Endurance; Steps: 0" },
        kinds,
        held
      )
    ).toEqual(["Path Unlocked: Path of Endurance."])
    expect(
      spokenWindow(
        { kind: "item-award", name: "Talented", note: "Advanced Attribute: Talented (100)" },
        kinds,
        held,
        new Set(["Advanced Attribute"])
      )
    ).toEqual(["Advanced Attribute Unlocked: Talented."])
  })

  test("a level up says the level reached", () => {
    expect(spokenWindow({ kind: "level-up", level: 4 })).toEqual([
      "Level up.",
      "You are now level 4.",
    ])
  })

  test("quests, items, affinities, classes and titles each have their own words", () => {
    expect(spokenWindow({ kind: "quest-offer", name: "Closeness", note: "close in" })).toEqual([
      "New quest: Closeness.",
      "close in.",
    ])
    expect(spokenWindow({ kind: "quest-complete", name: "Closeness" })).toEqual([
      "Quest complete: Closeness.",
    ])
    expect(
      spokenWindow({ kind: "item-award", name: "Clouded lens", note: "Recovered from: the seat" })
    ).toEqual(["Item received: Clouded lens.", "Recovered from, the seat."])
    expect(spokenWindow({ kind: "affinity", name: "Force" })).toEqual(["Affinity gained: Force."])
    expect(spokenWindow({ kind: "class", name: "Enthraller" })).toEqual(["Class: Enthraller."])
    expect(spokenWindow({ kind: "title", name: "Oathkeeper" })).toEqual([
      "Title earned: Oathkeeper.",
    ])
  })

  test("a kind with no rule says its kind, its name and its note", () => {
    expect(spokenWindow({ kind: "system-choice", name: "THE LINK", note: "pick one" })).toEqual([
      "System choice: The Link.",
      "pick one.",
    ])
  })
})

describe("spokenScreen", () => {
  test("a fenced screen is said one line at a time, its brackets and capitals softened", () => {
    expect(
      spokenScreen([
        "[SKILL ACQUIRED — RESONANT READING]",
        "Tier II — Brightspirit",
        "",
        "No activation cost. No cooldown.",
        "SKILL — Ember Burst → Apprentice",
        "360 MP",
      ])
    ).toEqual([
      "Skill Acquired, Resonant Reading.",
      "Tier II, Brightspirit.",
      "No activation cost. No cooldown.",
      "Skill, Ember Burst to Apprentice.",
      "360 MP.",
    ])
  })

  test("a rule, a box border or an ornament on a screen is never said", () => {
    expect(
      spokenScreen([
        "╔══════════════════════╗",
        "------------------------------",
        "Sheikah Slate Updated.",
        "---",
        "✦ Lean Your Will.",
        "Individual Res threshold: ✓ Solenne",
        "[_______________________]",
        "Tier: Blind to Aware. ──────────",
        "**Skill Synthesis**",
      ])
    ).toEqual([
      "Sheikah Slate Updated.",
      "Lean Your Will.",
      "Individual Res threshold: Solenne.",
      "Tier: Blind to Aware.",
      "Skill Synthesis.",
    ])
  })
})

describe("spokenLine", () => {
  test("a line already ending a sentence keeps its own mark", () => {
    expect(spokenLine("You were already doing this!")).toBe("You were already doing this!")
    expect(spokenLine("   ")).toBe("")
  })
})
