import { expect, test } from "bun:test"
import type { PropertyDefinition } from "akasha/page/access/modules/page-type-config/page-type-config.module.code.ts"
import {
  type NamesOf,
  testOf,
  whereOf,
} from "akasha/page/access/modules/view-narrowing/view-narrowing.module.code.ts"

const STORY: PropertyDefinition = {
  id: "story",
  title: "Story",
  type: "relation",
  pageId: "p",
  config: { targetPageTypeSlug: "story" },
}

const STORIES: Readonly<Record<string, unknown>> = { "story-read/a": true, "story-read/b": false }

const namesOf: NamesOf = async (pageTypeSlug, key, kept) => {
  expect([pageTypeSlug, key]).toEqual(["story", "following"])
  return Object.keys(STORIES).filter((name) => kept(STORIES[name]))
}

test("a narrow on a page's own key is asked as the test it names, read as its kind", () => {
  expect(testOf({ key: "own-remaining", comparison: "at-or-after", values: ["1"] })).toEqual({
    "at-or-after": 1,
  })
  expect(testOf({ key: "removed-at", comparison: "empty", values: ["true"] })).toEqual({
    empty: true,
  })
})

test("a narrow through a relation is asked as the pages that relation may name", async () => {
  const narrows = [
    { key: "own-remaining", comparison: "at-or-after", values: ["1"] },
    { key: "story.following", comparison: "is", values: ["true"] },
  ]
  expect(await whereOf(narrows, [STORY], namesOf)).toEqual({
    where: { ownRemaining: { "at-or-after": 1 }, story: { in: ["story-read/a"] } },
  })
})

test("a narrow this cannot ask exactly is refused rather than widened", async () => {
  const moment = [{ key: "progressed-at", comparison: "before", values: ["now"] }]
  expect("refused" in (await whereOf(moment, [], namesOf))).toBe(true)
  const loose = [{ key: "author.following", comparison: "is", values: ["true"] }]
  expect("refused" in (await whereOf(loose, [STORY], namesOf))).toBe(true)
})
