import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/the-calamitous-bob-stubbed/stories/played/otherwhere-xi/mechanics/checks/otherwhere-xi-growth.world-check.settling.code.ts"

const NALA = "her"

test("a stat in the teens rises one for each two earnest days", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "stat", stat: "focus", value: 17, earnestDays: 3 }],
    })
  ).toEqual({
    answered: {
      grown: [{ kind: "stat", stat: "focus", from: 17, to: 18, daysCarried: 1, milestones: [] }],
    },
  })
})

test("an outlander counts each earnest day twice, and reaching twenty is a milestone", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "stat", stat: "acuity", value: 18, earnestDays: 2, outlander: true }],
    })
  ).toEqual({
    answered: {
      grown: [{ kind: "stat", stat: "acuity", from: 18, to: 20, daysCarried: 0, milestones: [20] }],
    },
  })
})

test("a low stat climbs fast and slows as it passes ten", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "stat", stat: "power", value: 6, earnestDays: 3, outlander: true }],
    })
  ).toHaveProperty("answered.grown.0.to", 11)
})

test("practice counts for nothing before she can feel mana, but a day in a locus does", () => {
  expect(
    settled({
      character: NALA,
      gains: [
        { kind: "attunement", value: 0.1, locusDays: 1, practiceHours: 3, firstSeason: true },
      ],
    })
  ).toEqual({
    answered: {
      grown: [{ kind: "attunement", from: 0.1, to: 0.3, feelsMana: false, casts: false }],
    },
  })
})

test("reaching one percent she first feels mana", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "attunement", value: 0.9, locusDays: 1, firstSeason: true }],
    })
  ).toHaveProperty("answered.grown.0.feelsMana", true)
})

test("past ten percent attunement comes at half the pace", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "attunement", value: 12, practiceHours: 2 }],
    })
  ).toHaveProperty("answered.grown.0.to", 12.1)
})

test("a novice skill rises a level for each two earnest uses", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "skill", skill: "Herding", rank: "Novice", level: 1, uses: 5 }],
    })
  ).toEqual({
    answered: {
      grown: [
        {
          kind: "skill",
          skill: "Herding",
          from: { rank: "Novice", level: 1 },
          to: { rank: "Novice", level: 3 },
          usesCarried: 1,
          expertChoice: false,
        },
      ],
    },
  })
})

test("past level nine a skill takes the next rank at level one", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "skill", skill: "Herding", rank: "Novice", level: 9, uses: 2 }],
    })
  ).toHaveProperty("answered.grown.0.to", { rank: "Beginner", level: 1 })
})

test("at Intermediate nine the interface offers her the choice of how it becomes Expert", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "skill", skill: "Herding", rank: "Intermediate", level: 9, uses: 6 }],
    })
  ).toHaveProperty("answered.grown.0.expertChoice", true)
})

test("a reading with no gain is refused", () => {
  expect(settled({ character: NALA, gains: [] })).toHaveProperty("refused")
})

test("a skill level past nine is refused", () => {
  expect(
    settled({
      character: NALA,
      gains: [{ kind: "skill", skill: "Herding", rank: "Novice", level: 10, uses: 1 }],
    })
  ).toHaveProperty("refused")
})
