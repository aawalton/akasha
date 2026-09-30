import { expect, test } from "bun:test"
import {
  gradeOfLevel,
  maxHealthOf,
  maxManaOf,
  settled,
} from "akasha/story/world/pages/mana-devourer-litrpgmana-cultivation/stories/played/otherwhere-ix/mechanics/checks/otherwhere-ix-growth.world-check.settling.code.ts"

const NALA = { character: "otherwhere-ix-nala", constitution: 12, spirit: 16 }

test("a level-one woman who kills a shardback, one grade above her, gains three levels", () => {
  expect(settled({ ...NALA, level: 1, challenges: [{ grade: "F", outcome: "overcome" }] })).toEqual(
    {
      answered: {
        levelsGained: 3,
        level: 4,
        grade: "G",
        pointsGained: 24,
        maxHealth: 170,
        maxMana: 344,
      },
    }
  )
})

test("surviving a peril she could not overcome gives half", () => {
  expect(
    settled({ ...NALA, level: 1, challenges: [{ grade: "E", outcome: "survived" }] })
  ).toHaveProperty("answered.levelsGained", 3)
})

test("a failed challenge gives nothing", () => {
  expect(
    settled({ ...NALA, level: 1, challenges: [{ grade: "F", outcome: "failed" }] })
  ).toHaveProperty("answered.levelsGained", 0)
})

test("a foe below her grade gives nothing", () => {
  expect(
    settled({ ...NALA, level: 10, challenges: [{ grade: "G", outcome: "overcome" }] })
  ).toHaveProperty("answered.levelsGained", 0)
})

test("four hours of hard training give a level", () => {
  expect(settled({ ...NALA, level: 3, trainingHours: 4 })).toHaveProperty(
    "answered.levelsGained",
    1
  )
})

test("levels come half as fast past twenty-five, but a real gain gives at least one", () => {
  expect(
    settled({ ...NALA, level: 30, challenges: [{ grade: "F", outcome: "overcome" }] })
  ).toHaveProperty("answered.levelsGained", 1)
})

test("a second challenge is weighed against the grade the first lifted her to", () => {
  expect(
    settled({
      ...NALA,
      level: 4,
      challenges: [
        { grade: "G", outcome: "overcome" },
        { grade: "F", outcome: "overcome" },
      ],
    })
  ).toHaveProperty("answered", {
    levelsGained: 2,
    level: 6,
    grade: "F",
    pointsGained: 16,
    maxHealth: 170,
    maxMana: 344,
  })
})

test("levels past twenty-four come at half pace even within one turn", () => {
  expect(settled({ ...NALA, level: 24, trainingHours: 8 })).toHaveProperty(
    "answered.levelsGained",
    1
  )
})

test("a person is G Grade to level four and F Grade from five", () => {
  expect([gradeOfLevel(4), gradeOfLevel(5), gradeOfLevel(100)]).toEqual(["G", "F", "E"])
})

test("health is fifty and ten per Constitution, a third more from a hundred", () => {
  expect([maxHealthOf(12), maxHealthOf(100)]).toEqual([170, 1400])
})

test("mana is twenty per Spirit and two per Constitution, half again from a hundred Spirit", () => {
  expect([maxManaOf(16, 12), maxManaOf(100, 0)]).toEqual([344, 3000])
})

test("a reading with no attributes is refused", () => {
  expect(settled({ character: "otherwhere-ix-nala", level: 1 })).toHaveProperty("refused")
})
