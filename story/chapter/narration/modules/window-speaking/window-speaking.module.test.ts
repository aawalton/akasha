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
})

describe("spokenLine", () => {
  test("a line already ending a sentence keeps its own mark", () => {
    expect(spokenLine("You were already doing this!")).toBe("You were already doing this!")
    expect(spokenLine("   ")).toBe("")
  })
})
