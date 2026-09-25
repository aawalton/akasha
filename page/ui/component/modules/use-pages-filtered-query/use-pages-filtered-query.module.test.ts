import { expect, test } from "bun:test"
import { NEVER_MATCH_SLUG } from "akasha/page/access/modules/sentinels/sentinels.module.code.ts"
import { groupedSlugOf } from "akasha/page/ui/component/modules/use-pages-filtered-query/use-pages-filtered-query.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"

const STORY_CHAPTER_READ = toPageTypeSlug("story-chapter-read")

test("a listing grouped by a property asks for the pages of its own page type", () => {
  expect(groupedSlugOf("story", STORY_CHAPTER_READ)).toBe("story-chapter-read")
})

test("a listing grouped by nothing asks the grouped query for no pages rather than naming an empty page type", () => {
  expect(groupedSlugOf(undefined, STORY_CHAPTER_READ)).toBe(NEVER_MATCH_SLUG)
})
