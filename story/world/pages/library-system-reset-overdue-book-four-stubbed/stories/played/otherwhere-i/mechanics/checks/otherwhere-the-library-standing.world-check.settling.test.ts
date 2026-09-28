import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/checks/otherwhere-the-library-standing.world-check.settling.code.ts"

const AT = {
  character: "him",
  kept: 2,
  heard: 1,
  shared: 0,
  crossed: 0,
  quotes: { kept: "she swept the worms", heard: ["fine, go on", "I'm listening"] },
}

test("the three marks add up to the standing earned", () => {
  expect(settled(AT)).toEqual({ answered: { earned: 3, lost: 0, change: 3 } })
})

test("each line crossed costs two", () => {
  expect(settled({ ...AT, crossed: 2, quotes: { ...AT.quotes, crossed: "shut up" } })).toEqual({
    answered: { earned: 3, lost: 4, change: -1 },
  })
})

test("a mark above two is refused", () => {
  expect(settled({ ...AT, shared: 3 })).toHaveProperty("refused")
})

test("a mark above nought with no quote is refused", () => {
  expect(settled({ ...AT, quotes: { heard: "x" } })).toHaveProperty("refused")
})

test("a crossed line with no quote is refused", () => {
  expect(settled({ ...AT, crossed: 1 })).toHaveProperty("refused")
})

test("a reading naming no character is refused", () => {
  expect(settled({ ...AT, character: " " })).toHaveProperty("refused")
})

test("a mark left unscored is refused", () => {
  expect(settled({ ...AT, shared: undefined })).toHaveProperty("refused")
})

test("a reading that is no keyed reading is refused", () => {
  expect(settled([1, 2, 3])).toHaveProperty("refused")
})
