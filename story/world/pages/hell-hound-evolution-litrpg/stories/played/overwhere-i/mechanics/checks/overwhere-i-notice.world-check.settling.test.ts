import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/checks/overwhere-i-notice.world-check.settling.code.ts"

const NALA = "her"

test("a spectacle of raw element in the village square raises its notice two", () => {
  expect(
    settled({
      character: NALA,
      circles: [{ circle: "village", value: 0, deeds: [{ kind: "spectacle" }] }],
    })
  ).toEqual({
    answered: {
      noticed: [{ circle: "village", from: 0, to: 2, sought: false, agents: false }],
    },
  })
})

test("reaching three in a circle draws someone to look for her", () => {
  expect(
    settled({
      character: NALA,
      circles: [{ circle: "march", value: 2, deeds: [{ kind: "seen-using-power" }] }],
    })
  ).toHaveProperty("answered.noticed.0.sought", true)
})

test("reaching five in a far power draws its agents", () => {
  expect(
    settled({
      character: NALA,
      circles: [{ circle: "umarii", value: 4, deeds: [{ kind: "word-carried" }] }],
    })
  ).toEqual({
    answered: {
      noticed: [{ circle: "umarii", from: 4, to: 5, sought: false, agents: true }],
    },
  })
})

test("reaching five in a near circle draws no agents", () => {
  expect(
    settled({
      character: NALA,
      circles: [{ circle: "kingdom", value: 4, deeds: [{ kind: "spectacle" }] }],
    })
  ).toEqual({
    answered: {
      noticed: [{ circle: "kingdom", from: 4, to: 5, sought: false, agents: false }],
    },
  })
})

test("a quiet season lets notice fall, never below nought", () => {
  expect(
    settled({
      character: NALA,
      circles: [{ circle: "iron-march", value: 0, deeds: [{ kind: "quiet-season" }] }],
    })
  ).toHaveProperty("answered.noticed.0.to", 0)
})

test("a circle the check does not know is refused", () => {
  expect(
    settled({
      character: NALA,
      circles: [{ circle: "moon", value: 0, deeds: [{ kind: "spectacle" }] }],
    })
  ).toHaveProperty("refused")
})

test("a circle with no deed is refused", () => {
  expect(
    settled({ character: NALA, circles: [{ circle: "village", value: 0, deeds: [] }] })
  ).toHaveProperty("refused")
})
