import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/checks/overwhere-iv-growth.world-check.settling.code.ts"

test("a foe at or over her level is worth twice its level", () => {
  expect(
    settled({
      character: "nala",
      gains: [{ kind: "experience", track: "race", level: 1, experience: 0, foes: [3] }],
    })
  ).toEqual({
    answered: {
      grown: [
        { kind: "experience", track: "race", from: 1, to: 1, experience: 6, next: 10, points: 0 },
      ],
    },
  })
})

test("enough experience raises several levels and earns a point for each", () => {
  expect(
    settled({
      character: "nala",
      gains: [{ kind: "experience", track: "race", level: 1, experience: 0, foes: [8, 8] }],
    })
  ).toHaveProperty("answered.grown.0", {
    kind: "experience",
    track: "race",
    from: 1,
    to: 3,
    experience: 2,
    next: 30,
    points: 2,
  })
})

test("a foe under half her level is worth one", () => {
  expect(
    settled({
      character: "nala",
      gains: [
        { kind: "experience", track: "class", level: 10, experience: 0, foes: [2], deeds: 3 },
      ],
    })
  ).toHaveProperty("answered.grown.0.experience", 4)
})

test("a kill is priced at the level she holds when it falls", () => {
  expect(
    settled({
      character: "nala",
      gains: [{ kind: "experience", track: "race", level: 1, experience: 9, foes: [1, 1] }],
    })
  ).toHaveProperty("answered.grown.0", {
    kind: "experience",
    track: "race",
    from: 1,
    to: 2,
    experience: 2,
    next: 20,
    points: 1,
  })
})

test("a harmless pest gives one, whatever its level", () => {
  expect(
    settled({
      character: "nala",
      gains: [{ kind: "experience", track: "race", level: 3, experience: 0, pests: 5 }],
    })
  ).toHaveProperty("answered.grown.0.experience", 5)
})

test("reaching a tenth level earns an extra point", () => {
  expect(
    settled({
      character: "nala",
      gains: [{ kind: "experience", track: "race", level: 9, experience: 89, deeds: 1 }],
    })
  ).toHaveProperty("answered.grown.0.points", 2)
})

test("skill uses raise a skill through its levels", () => {
  expect(
    settled({
      character: "nala",
      gains: [{ kind: "skill", skill: "Dimension Magic", level: 1, uses: 6 }],
    })
  ).toEqual({
    answered: {
      grown: [
        { kind: "skill", skill: "Dimension Magic", from: 1, to: 3, usesCarried: 1, maxed: false },
      ],
    },
  })
})

test("a skill stops at LV MAX", () => {
  expect(
    settled({ character: "nala", gains: [{ kind: "skill", skill: "Blink", level: 9, uses: 50 }] })
  ).toHaveProperty("answered.grown.0.maxed", true)
})

test("a gain the game does not have is refused", () => {
  expect(settled({ character: "nala", gains: [{ kind: "stat" }] })).toHaveProperty("refused")
})

test("uses toward a skill she lacks are carried at LV 0", () => {
  expect(
    settled({
      character: "nala",
      gains: [{ kind: "skill", skill: "Sense Casting", level: 0, uses: 2 }],
    })
  ).toEqual({
    answered: {
      grown: [
        { kind: "skill", skill: "Sense Casting", from: 0, to: 0, usesCarried: 2, maxed: false },
      ],
    },
  })
})

test("a third use gains a skill she lacks at LV 1", () => {
  expect(
    settled({
      character: "nala",
      gains: [{ kind: "skill", skill: "Sense Casting", level: 0, uses: 3 }],
    })
  ).toHaveProperty("answered.grown.0", {
    kind: "skill",
    skill: "Sense Casting",
    from: 0,
    to: 1,
    usesCarried: 0,
    maxed: false,
  })
})

test("uses past the third carry on toward LV 2", () => {
  expect(
    settled({
      character: "nala",
      gains: [{ kind: "skill", skill: "Sense Casting", level: 0, uses: 6 }],
    })
  ).toHaveProperty("answered.grown.0", {
    kind: "skill",
    skill: "Sense Casting",
    from: 0,
    to: 2,
    usesCarried: 1,
    maxed: false,
  })
})
