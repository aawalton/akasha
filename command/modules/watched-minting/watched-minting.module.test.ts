import { expect, test } from "bun:test"
import {
  type Watching,
  watchedFor,
} from "akasha/command/modules/watched-minting/watched-minting.module.code.ts"

const ONCE = "2020-01-01T00:00:00.000Z"

const NOW_SAID = "2026-10-18T12:00:00.000Z"

const WAS = { slug: "one", ownProgress: 1, progressedAt: ONCE }

function over(
  value: Readonly<Record<string, unknown>>,
  was: Readonly<Record<string, unknown>> = WAS
): Watching {
  return { key: "progressedAt", watches: "ownProgress", value, was, now: Date.parse(NOW_SAID) }
}

test("a value watching a key is given the moment that key's value changed", () => {
  expect(watchedFor(over({ ...WAS, ownProgress: 2 }))).toEqual({
    placing: "replace",
    said: JSON.stringify(NOW_SAID),
  })
})

test("a value watching a key keeps its moment where only another value changed", () => {
  expect(watchedFor(over({ ...WAS, slug: "two" }))).toBeNull()
})

test("a value watching a key is given back where a page is written over without it", () => {
  expect(watchedFor(over({ slug: "one", ownProgress: 1 }))).toEqual({
    placing: "insert",
    said: JSON.stringify(ONCE),
  })
})

test("a value watching a key is given the moment where it was never given one", () => {
  const was = { slug: "one", ownProgress: 1 }
  expect(watchedFor(over({ slug: "one", ownProgress: 2 }, was))).toEqual({
    placing: "insert",
    said: JSON.stringify(NOW_SAID),
  })
})

test("a change stating the moment itself keeps the moment it states", () => {
  const stated = { ...WAS, ownProgress: 2, progressedAt: "2021-01-01T00:00:00.000Z" }
  expect(watchedFor(over(stated))).toBeNull()
})

test("a value watching a key is worked out for no page being created", () => {
  expect(watchedFor({ ...over(WAS), was: null })).toBeNull()
})
