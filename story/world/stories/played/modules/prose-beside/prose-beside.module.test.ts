import { expect, test } from "bun:test"
import {
  type PlayedProse,
  proseOver,
} from "akasha/story/world/stories/played/modules/prose-beside/prose-beside.module.code.ts"

const FIRST = "the-dating-game-00-001"

const SECOND = "the-dating-game-00-002"

const HELD: PlayedProse = {
  prose: new Map([[FIRST, "She laughed."]]),
  read: new Set([FIRST]),
}

test("a read again answering takes the place of the prose read before", () => {
  const said = new Map([[FIRST, "She laughed, and meant it."]])
  const played = proseOver(HELD, said, [FIRST])
  expect(played.prose.get(FIRST)).toBe("She laughed, and meant it.")
  expect([...played.read]).toEqual([FIRST])
})

test("a read again that is refused leaves the prose read before in place", () => {
  expect(proseOver(HELD, null, [FIRST])).toBe(HELD)
})

test("a refused read for a row not read before leaves every row asked read with no prose", () => {
  const played = proseOver(HELD, null, [FIRST, SECOND])
  expect(played.prose.size).toBe(0)
  expect([...played.read]).toEqual([FIRST, SECOND])
})
