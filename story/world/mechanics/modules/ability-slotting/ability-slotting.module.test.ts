import { expect, test } from "bun:test"
import {
  completed,
  type Holding,
  nextTierStep,
  type SlotKind,
  slotsHeld,
  slotted,
} from "akasha/story/world/mechanics/modules/ability-slotting/ability-slotting.module.code.ts"

const BASIC = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]

const PATH: SlotKind = {
  page: "world-ability-kind/path",
  title: "Path",
  pluralTitle: "Paths",
  activeSlots: 10,
}

function holding(slug: string, over: Partial<Holding> = {}): Holding {
  return {
    page: `character-skill/${slug}`,
    title: slug,
    kind: PATH.page,
    experience: 0,
    dormant: null,
    tierSteps: BASIC,
    ...over,
  }
}

function heldMany(count: number): readonly Holding[] {
  return Array.from({ length: count }, (_, at) => holding(`path-${String(at)}`))
}

test("setting a path aside keeps the tiers it passed and loses the steps past the last", () => {
  const one = holding("infiltration", { experience: 12 })
  expect(slotted(one, PATH, [one], "set-aside")).toEqual({
    event: "infiltration is set aside at tier 1.",
    changes: [
      {
        page: "character-skill/infiltration",
        note: "infiltration set aside",
        key: "dormant",
        from: null,
        to: true,
      },
      {
        page: "character-skill/infiltration",
        note: "infiltration loses 2 toward its next tier",
        key: "experience",
        from: 12,
        to: 10,
      },
    ],
  })
})

test("a path exactly on a tier loses nothing when set aside", () => {
  const one = holding("hatchets", { experience: 100, dormant: false })
  const answer = slotted(one, PATH, [one], "set-aside")
  expect(answer).toEqual({
    event: "hatchets is set aside at tier 4.",
    changes: [
      {
        page: "character-skill/hatchets",
        note: "hatchets set aside",
        key: "dormant",
        from: false,
        to: true,
      },
    ],
  })
})

test("a path set aside is taken up again while a slot is free", () => {
  const one = holding("coordination", { dormant: true, experience: 1000 })
  const answer = slotted(one, PATH, [one, ...heldMany(9)], "taken-up")
  expect(answer).toEqual({
    event: "coordination is taken up again.",
    changes: [
      {
        page: "character-skill/coordination",
        note: "coordination taken up again",
        key: "dormant",
        from: true,
        to: false,
      },
    ],
  })
})

test("taking a path up is refused while all ten slots are held", () => {
  const one = holding("aethersensing", { dormant: true })
  expect(slotted(one, PATH, [one, ...heldMany(10)], "taken-up")).toEqual({
    refused: "All 10 Paths slots are held, so set one aside first.",
  })
})

test("a completed path holds no slot, so it frees one for another", () => {
  const done = holding("basic-numeracy", { experience: 10000 })
  expect(completed(done)).toBe(true)
  expect(slotsHeld(PATH, [done, ...heldMany(9)])).toBe(9)
  const one = holding("crawling", { dormant: true })
  expect(slotted(one, PATH, [one, done, ...heldMany(9)], "taken-up")).toHaveProperty("event")
})

test("a path of another kind takes no slot of this one", () => {
  const other = holding("dungeon", { kind: "world-ability-kind/dungeon-path" })
  expect(slotsHeld(PATH, [other, ...heldMany(9)])).toBe(9)
})

test("a path whose skill states no tiers is not set aside", () => {
  const one = holding("exceptionalism", { tierSteps: [], experience: 108 })
  expect(slotted(one, PATH, [one], "set-aside")).toEqual({
    refused: "exceptionalism states no tiers, so what setting it aside loses is unknown.",
  })
})

test("a completed path is not set aside, and one set aside is not set aside again", () => {
  expect(slotted(holding("done", { experience: 10000 }), PATH, [], "set-aside")).toHaveProperty(
    "refused"
  )
  expect(slotted(holding("aside", { dormant: true }), PATH, [], "set-aside")).toEqual({
    refused: "aside is set aside already.",
  })
  expect(slotted(holding("worked"), PATH, [], "taken-up")).toEqual({
    refused: "worked is being worked on already.",
  })
})

test("an ability whose kind states no slots is used rather than set aside", () => {
  const skill: SlotKind = { ...PATH, activeSlots: null }
  expect(slotted(holding("muffled-steps"), skill, [], "set-aside")).toHaveProperty("refused")
  expect(slotted(holding("muffled-steps", { kind: null }), null, [], "set-aside")).toHaveProperty(
    "refused"
  )
})

test("the next tier step is the first step not yet reached, and none once all are passed", () => {
  expect(nextTierStep(BASIC, 27)).toBe(50)
  expect(nextTierStep(BASIC, 25)).toBe(50)
  expect(nextTierStep(BASIC, 0)).toBe(10)
  expect(nextTierStep(BASIC, 10000)).toBeNull()
  expect(nextTierStep([], 108)).toBeNull()
})
