import { describe, expect, test } from "bun:test"
import {
  abilityTitleIn,
  describedIn,
  proseWindowSegmentsIn,
  slottedWindowOf,
  windowOf,
} from "akasha/story/engine/core/modules/prose-windows/prose-windows.module.code.ts"

describe("proseWindowSegmentsIn", () => {
  test("prose with no window is one run", () => {
    expect(proseWindowSegmentsIn("one\n\ntwo")).toEqual([{ kind: "prose", text: "one\n\ntwo" }])
  })

  test("a window between paragraphs parts the runs and carries its fields", () => {
    const text = [
      "He lifts the lens.",
      "",
      ":::item-award",
      "name: Clouded lens",
      "note: Recovered from: the Host's seat",
      ":::",
      "",
      "He stows it.",
    ].join("\n")
    expect(proseWindowSegmentsIn(text)).toEqual([
      { kind: "prose", text: "He lifts the lens." },
      {
        kind: "window",
        window: {
          kind: "item-award",
          name: "Clouded lens",
          note: "Recovered from: the Host's seat",
        },
      },
      { kind: "prose", text: "He stows it." },
    ])
  })

  test("a level is read as a number", () => {
    expect(proseWindowSegmentsIn(":::level-up\nlevel: 7\n:::")).toEqual([
      { kind: "window", window: { kind: "level-up", level: 7 } },
    ])
  })

  test("a window left open shuts at the blank line, and no colons reach the prose", () => {
    const segments = proseWindowSegmentsIn("a\n:::skill\nname: Smithing\n\nb\n\n:::\n\nc")
    expect(segments).toEqual([
      { kind: "prose", text: "a" },
      { kind: "window", window: { kind: "skill", name: "Smithing" } },
      { kind: "prose", text: "b\n\n\nc" },
    ])
  })

  test("empty text holds no segments", () => {
    expect(proseWindowSegmentsIn("\n\n  \n")).toEqual([])
  })
})

describe("windowOf", () => {
  test("every kind a window is written as goes back to the card's shape", () => {
    expect(windowOf({ kind: "level-up", level: 5 })).toEqual({ type: "level-up", level: 5 })
    expect(windowOf({ kind: "skill", name: "Smithing", rung: "Apprentice" })).toEqual({
      type: "skill",
      skill: "Smithing",
      rank: "Apprentice",
    })
    expect(windowOf({ kind: "skill", name: "Chain Whip" })).toEqual({
      type: "skill",
      skill: "Chain Whip",
    })
    expect(windowOf({ kind: "affinity", name: "Force Affinity" })).toEqual({
      type: "affinity",
      affinity: "Force Affinity",
    })
    expect(
      windowOf({
        kind: "item-award",
        name: "Clouded lens",
        note: "Recovered from: the Host's seat",
      })
    ).toEqual({
      type: "item-award",
      award: {
        item: "Clouded lens",
        descriptors: [{ label: "Recovered from", value: "the Host's seat" }],
      },
    })
    expect(windowOf({ kind: "quest-offer", name: "Closeness", note: "close in" })).toEqual({
      type: "quest-added",
      quest: { title: "Closeness", objective: "close in" },
    })
    expect(windowOf({ kind: "status-assessment", name: "None", level: 1 })).toEqual({
      type: "status-assessment",
      assessment: { name: "None", level: 1 },
    })
    expect(
      windowOf({
        kind: "status-assessment",
        name: "Elsie Fairweather",
        note: "Class: Enthraller; Bonds: Tamsin 15",
      })
    ).toEqual({
      type: "status-assessment",
      assessment: {
        name: "Elsie Fairweather",
        descriptors: [
          { label: "Class", value: "Enthraller" },
          { label: "Bonds", value: "Tamsin 15" },
        ],
      },
    })
  })

  test("a window of no kind a card takes, or fields no card takes, draws nothing", () => {
    expect(windowOf({ kind: "", name: "nothing" })).toBe(undefined)
    expect(windowOf({ kind: "system-choice", name: "THE LINK" })).toBe(undefined)
  })

  test("what an award was recovered from goes back to a label and a value", () => {
    expect(describedIn("Recovered from: the Host's seat; plain")).toEqual([
      { label: "Recovered from", value: "the Host's seat" },
      { label: "", value: "plain" },
    ])
  })
})

const SLOTTED = new Set(["Path of Soulstealing", "Path of Basic Numeracy"])

describe("slottedWindowOf", () => {
  test("a slotted ability's window keeps neither its reward nor its steps", () => {
    const window = {
      kind: "status-assessment",
      name: "Path of Soulstealing",
      note: "Tier 1: 10 steps; Reward: Aether Core rises one grade",
    }
    expect(slottedWindowOf(window, SLOTTED)).toEqual({
      kind: "status-assessment",
      name: "Path of Soulstealing",
    })
  })

  test("what else the window says stays, and a qualifier after the name is looked past", () => {
    expect(
      slottedWindowOf(
        { kind: "status-assessment", name: "Path of Basic Numeracy", note: "Tier: 2; Mental: +1" },
        SLOTTED
      ).note
    ).toBe("Tier: 2; Mental: +1")
    expect(
      slottedWindowOf(
        { kind: "status-assessment", name: "Path of Soulstealing (mutated)", note: "Steps: few" },
        SLOTTED
      ).note
    ).toBeUndefined()
    expect(abilityTitleIn("Path of Soulstealing (mutated)")).toBe("Path of Soulstealing")
  })

  test("a window naming no slotted ability is left whole", () => {
    const window = { kind: "status-assessment", name: "Fireball", note: "Reward: warmth" }
    expect(slottedWindowOf(window, SLOTTED)).toBe(window)
  })
})
