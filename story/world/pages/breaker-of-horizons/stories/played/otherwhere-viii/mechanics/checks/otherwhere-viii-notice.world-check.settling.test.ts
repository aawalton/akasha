import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/breaker-of-horizons/stories/played/otherwhere-viii/mechanics/checks/otherwhere-viii-notice.world-check.settling.code.ts"

const NALA = "nala"

test("marks add to her notice", () => {
  expect(
    settled({
      character: NALA,
      notice: 0,
      marks: [
        { from: "an odd deed seen in public", by: 1 },
        { from: "a police questioning", by: 2 },
      ],
      quietWeeks: 0,
    })
  ).toEqual({ answered: { notice: 3 } })
})

test("each quiet week takes one", () => {
  expect(settled({ character: NALA, notice: 12, marks: [], quietWeeks: 3 })).toEqual({
    answered: { notice: 9 },
  })
})

test("notice never falls below nought", () => {
  expect(settled({ character: NALA, notice: 2, marks: [], quietWeeks: 5 })).toEqual({
    answered: { notice: 0 },
  })
})

test("notice never passes a hundred", () => {
  expect(
    settled({
      character: NALA,
      notice: 95,
      marks: [{ from: "dealings with the Academy's people", by: 8 }],
      quietWeeks: 0,
    })
  ).toEqual({ answered: { notice: 100 } })
})

test("a mark with an empty source is refused", () => {
  expect(
    settled({ character: NALA, notice: 0, marks: [{ from: "", by: 2 }], quietWeeks: 0 })
  ).toHaveProperty("refused")
})

test("a mark past ten is refused", () => {
  expect(
    settled({ character: NALA, notice: 0, marks: [{ from: "a Spire", by: 11 }], quietWeeks: 0 })
  ).toHaveProperty("refused")
})

test("a reading naming no character is refused", () => {
  expect(settled({ character: "", notice: 0, marks: [], quietWeeks: 0 })).toHaveProperty("refused")
})
