import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/checks/overwhere-i-growth.world-check.settling.code.ts"

const NALA = "her"

test("a foe five or more levels above her earns three marks and a level", () => {
  expect(
    settled({ character: NALA, gains: [{ kind: "level", level: 1, marks: 0, foeLevel: 6 }] })
  ).toEqual({
    answered: {
      grown: [
        {
          kind: "level",
          from: 1,
          to: 2,
          earned: 3,
          marksLeft: 1,
          stats: { strength: 2, dexterity: 2, vigor: 2, attunement: 4, luck: 1 },
        },
      ],
    },
  })
})

test("a foe of her own level earns two marks", () => {
  expect(
    settled({ character: NALA, gains: [{ kind: "level", level: 3, marks: 0, foeLevel: 3 }] })
  ).toHaveProperty("answered.grown.0.earned", 2)
})

test("a foe up to five below her earns one mark", () => {
  expect(
    settled({ character: NALA, gains: [{ kind: "level", level: 10, marks: 0, foeLevel: 5 }] })
  ).toHaveProperty("answered.grown.0.earned", 1)
})

test("a foe far below her earns nothing", () => {
  expect(
    settled({ character: NALA, gains: [{ kind: "level", level: 10, marks: 4, foeLevel: 4 }] })
  ).toEqual({
    answered: {
      grown: [
        {
          kind: "level",
          from: 10,
          to: 10,
          earned: 0,
          marksLeft: 4,
          stats: { strength: 0, dexterity: 0, vigor: 0, attunement: 0, luck: 0 },
        },
      ],
    },
  })
})

test("marks held can carry her past more than one level", () => {
  expect(
    settled({ character: NALA, gains: [{ kind: "level", level: 1, marks: 4, foeLevel: 1 }] })
  ).toEqual({
    answered: {
      grown: [
        {
          kind: "level",
          from: 1,
          to: 3,
          earned: 2,
          marksLeft: 1,
          stats: { strength: 4, dexterity: 4, vigor: 4, attunement: 8, luck: 2 },
        },
      ],
    },
  })
})

test("several kills in one reading each start from the level and marks the kill before left", () => {
  const none = { strength: 0, dexterity: 0, vigor: 0, attunement: 0, luck: 0 }
  expect(
    settled({
      character: NALA,
      gains: [
        { kind: "level", level: 5, marks: 1, foeLevel: 10 },
        { kind: "level", level: 5, marks: 1, foeLevel: 11 },
        { kind: "level", level: 5, marks: 1, foeLevel: 12 },
      ],
    })
  ).toEqual({
    answered: {
      grown: [
        { kind: "level", from: 5, to: 5, earned: 3, marksLeft: 4, stats: none },
        {
          kind: "level",
          from: 5,
          to: 6,
          earned: 3,
          marksLeft: 1,
          stats: { strength: 2, dexterity: 2, vigor: 2, attunement: 4, luck: 1 },
        },
        { kind: "level", from: 6, to: 6, earned: 3, marksLeft: 4, stats: none },
      ],
    },
  })
})

test("a later kill earns marks by the level the kills before it raised her to", () => {
  expect(
    settled({
      character: NALA,
      gains: [
        { kind: "level", level: 5, marks: 4, foeLevel: 10 },
        { kind: "level", level: 5, marks: 4, foeLevel: 10 },
      ],
    })
  ).toHaveProperty("answered.grown.1", {
    kind: "level",
    from: 6,
    to: 6,
    earned: 2,
    marksLeft: 3,
    stats: { strength: 0, dexterity: 0, vigor: 0, attunement: 0, luck: 0 },
  })
})

test("a skill rises when its uses reach twice its level, and gives three to its stat", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "skill", skill: "Starfall Surge", level: 1, uses: 2 }],
    })
  ).toEqual({
    answered: {
      grown: [{ kind: "skill", skill: "Starfall Surge", from: 1, to: 2, usesLeft: 0, stat: 3 }],
    },
  })
})

test("a skill short of its uses holds", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "skill", skill: "Starfall Surge", level: 2, uses: 3 }],
    })
  ).toEqual({
    answered: {
      grown: [{ kind: "skill", skill: "Starfall Surge", from: 2, to: 2, usesLeft: 3, stat: 0 }],
    },
  })
})

test("a novel use rises a skill once its uses reach its level", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "skill", skill: "Starfall Surge", level: 2, uses: 2, novel: true }],
    })
  ).toHaveProperty("answered.grown.0.to", 3)
})

test("a skill at ten rises no further", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "skill", skill: "Starfall Surge", level: 10, uses: 40, novel: true }],
    })
  ).toHaveProperty("answered.grown.0.to", 10)
})

test("a feat ten levels above her lifts the legacy from rank one", () => {
  expect(
    settled({ character: NALA, gains: [{ kind: "legacy", rank: 1, level: 1, featLevel: 11 }] })
  ).toEqual({
    answered: { grown: [{ kind: "legacy", from: 1, to: 2, reserve: 10, newWays: 1 }] },
  })
})

test("a feat short of ten levels per rank above her leaves the legacy as it is", () => {
  expect(
    settled({ character: NALA, gains: [{ kind: "legacy", rank: 2, level: 3, featLevel: 22 }] })
  ).toEqual({
    answered: { grown: [{ kind: "legacy", from: 2, to: 2, reserve: 0, newWays: 0 }] },
  })
})

test("a legacy at rank five rises no further", () => {
  expect(
    settled({ character: NALA, gains: [{ kind: "legacy", rank: 5, level: 1, featLevel: 99 }] })
  ).toHaveProperty("answered.grown.0.to", 5)
})

test("a reading with no gain is refused", () => {
  expect(settled({ character: NALA, gains: [] })).toHaveProperty("refused")
})

test("a skill level past ten is refused", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "skill", skill: "Starfall Surge", level: 11, uses: 1 }],
    })
  ).toHaveProperty("refused")
})
