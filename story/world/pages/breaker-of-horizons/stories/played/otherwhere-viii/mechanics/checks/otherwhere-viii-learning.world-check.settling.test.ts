import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/breaker-of-horizons/stories/played/otherwhere-viii/mechanics/checks/otherwhere-viii-learning.world-check.settling.code.ts"

const NALA = "nala"

const NO_HOURS = { studyHours: 0, taughtHours: 0, practiceHours: 0, fastReader: false }

test("a day of study, teaching and practice adds up", () => {
  expect(
    settled({
      character: NALA,
      set: "basic",
      fluency: 0,
      studyHours: 4,
      taughtHours: 2,
      practiceHours: 2,
      fastReader: false,
    })
  ).toEqual({ answered: { gained: 6, fluency: 6 } })
})

test("a fast reader gains a whole point an hour of study", () => {
  expect(
    settled({
      ...NO_HOURS,
      character: NALA,
      set: "basic",
      fluency: 0,
      studyHours: 4,
      fastReader: true,
    })
  ).toHaveProperty("answered.gained", 4)
})

test("gains halve past fifty", () => {
  expect(
    settled({ ...NO_HOURS, character: NALA, set: "basic", fluency: 60, taughtHours: 4 })
  ).toEqual({ answered: { gained: 3, fluency: 63 } })
})

test("signifier gains are halved", () => {
  expect(
    settled({
      ...NO_HOURS,
      character: NALA,
      set: "signifier",
      fluency: 0,
      basicFluency: 60,
      taughtHours: 4,
    })
  ).toHaveProperty("answered.gained", 3)
})

test("advanced gains are a third", () => {
  expect(
    settled({
      ...NO_HOURS,
      character: NALA,
      set: "advanced",
      fluency: 0,
      basicFluency: 60,
      taughtHours: 2,
    })
  ).toHaveProperty("answered.gained", 1)
})

test("special gains are a sixth", () => {
  expect(
    settled({
      ...NO_HOURS,
      character: NALA,
      set: "special",
      fluency: 0,
      basicFluency: 60,
      taughtHours: 4,
    })
  ).toHaveProperty("answered.gained", 1)
})

test("a set's share and the slowing past fifty both apply", () => {
  expect(
    settled({
      ...NO_HOURS,
      character: NALA,
      set: "signifier",
      fluency: 50,
      basicFluency: 80,
      taughtHours: 4,
    })
  ).toEqual({ answered: { gained: 1.5, fluency: 51.5 } })
})

test("fluency never passes a hundred", () => {
  expect(
    settled({ ...NO_HOURS, character: NALA, set: "basic", fluency: 99, taughtHours: 10 })
  ).toEqual({ answered: { gained: 7.5, fluency: 100 } })
})

test("a set beyond basic with basic fluency under fifty is refused", () => {
  expect(
    settled({
      ...NO_HOURS,
      character: NALA,
      set: "signifier",
      fluency: 0,
      basicFluency: 40,
      taughtHours: 2,
    })
  ).toHaveProperty("refused")
})

test("a set beyond basic with no basic fluency given is refused", () => {
  expect(
    settled({ ...NO_HOURS, character: NALA, set: "advanced", fluency: 0, taughtHours: 2 })
  ).toHaveProperty("refused")
})

test("a reading naming no character is refused", () => {
  expect(settled({ ...NO_HOURS, character: " ", set: "basic", fluency: 0 })).toHaveProperty(
    "refused"
  )
})

test("fluency past a hundred is refused", () => {
  expect(settled({ ...NO_HOURS, character: NALA, set: "basic", fluency: 101 })).toHaveProperty(
    "refused"
  )
})
