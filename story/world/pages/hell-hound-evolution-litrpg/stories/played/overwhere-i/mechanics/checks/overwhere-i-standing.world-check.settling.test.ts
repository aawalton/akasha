import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/checks/overwhere-i-standing.world-check.settling.code.ts"

const VILLAGE = "the village over the ridge"

test("ending a threat to a village raises its regard two", () => {
  expect(
    settled({
      community: VILLAGE,
      regard: 0,
      deeds: [{ deed: "ended-a-threat", quote: "she brought back the wolf's head" }],
    })
  ).toEqual({ answered: { community: VILLAGE, from: 0, to: 2, moved: 2 } })
})

test("good and bad deeds in one turn add together", () => {
  expect(
    settled({
      community: VILLAGE,
      regard: 1,
      deeds: [
        { deed: "helped-openly", quote: "she hauled the cart out of the ford" },
        { deed: "frightened-them", quote: "the fire leapt from her hands in the square" },
      ],
    })
  ).toEqual({ answered: { community: VILLAGE, from: 1, to: 1, moved: 0 } })
})

test("regard rises no higher than five", () => {
  expect(
    settled({
      community: VILLAGE,
      regard: 4,
      deeds: [
        { deed: "saved-a-life", quote: "she pulled the miller's boy from the flood" },
        { deed: "gave-freely", quote: "she left her coin with the widow" },
      ],
    })
  ).toEqual({ answered: { community: VILLAGE, from: 4, to: 5, moved: 1 } })
})

test("regard falls no lower than minus three", () => {
  expect(
    settled({
      community: VILLAGE,
      regard: -1,
      deeds: [{ deed: "harmed-one-of-theirs", quote: "she struck the reeve's son down" }],
    })
  ).toHaveProperty("answered.to", -3)
})

test("a deed with no quote is refused", () => {
  expect(
    settled({ community: VILLAGE, regard: 0, deeds: [{ deed: "gave-freely", quote: " " }] })
  ).toHaveProperty("refused")
})

test("a deed the check does not know is refused", () => {
  expect(
    settled({ community: VILLAGE, regard: 0, deeds: [{ deed: "smiled", quote: "she smiled" }] })
  ).toHaveProperty("refused")
})

test("a regard past five is refused", () => {
  expect(
    settled({ community: VILLAGE, regard: 6, deeds: [{ deed: "gave-freely", quote: "x" }] })
  ).toHaveProperty("refused")
})

test("a turn with no deed is refused", () => {
  expect(settled({ community: VILLAGE, regard: 0, deeds: [] })).toHaveProperty("refused")
})
