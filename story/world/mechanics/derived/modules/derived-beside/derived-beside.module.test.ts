import { expect, test } from "bun:test"
import {
  derivedIn,
  heldIn,
} from "akasha/story/world/mechanics/derived/modules/derived-beside/derived-beside.module.code.ts"
import { summingBy } from "akasha/story/world/mechanics/modules/linear-stat/linear-stat.module.code.ts"

const MIGHT = "might"

const GEAR = "gear"

const WORKINGS = [
  { title: "Health", worked: summingBy([{ of: MIGHT, by: 2 }], 1, "nearest") },
  { title: "Attack", worked: summingBy([{ of: GEAR, by: 1 }], 0, "nearest") },
]

test("the numbers held are summed by the page type each row is", () => {
  const held: Record<string, number> = { [GEAR]: 0 }
  heldIn(
    [
      { values: { type: GEAR, value: 10 } },
      { values: { type: GEAR, value: 2 } },
      { values: { type: MIGHT, value: "14" } },
    ],
    held
  )
  expect(held).toEqual({ [GEAR]: 12 })
})

test("a derived number is named by its page's title and left out where its formula refuses", () => {
  expect(derivedIn({ [MIGHT]: 7 }, WORKINGS)).toEqual({ Health: 15 })
  expect(derivedIn({ [MIGHT]: 7, [GEAR]: 3 }, WORKINGS)).toEqual({ Health: 15, Attack: 3 })
  expect(derivedIn({}, WORKINGS)).toEqual({})
  expect(derivedIn({ [MIGHT]: 7 }, [])).toEqual({})
})
