import { runMechanicalChange } from "@akasha/changes/mechanical-change-running"
import { akashaRoot } from "@akasha/pages/checkout-roots"
import { besideAt } from "@akasha/pages/page-file-name"
import type { Value } from "@akasha/pages/page-value"
import { asking } from "@akasha/pages-service/asking"
import { composedFor } from "@akasha/pages-service/composing"
import { chapterWords as countChapterWords } from "@akasha/story-engine-core/chapter-words"
import {
  CHAPTER_PAGE_TYPE,
  chapterPageSlug,
  chapterSlugOf,
  publishedDayOf,
  STORY_ADDRESS,
  STORY_PAGE_TYPE,
  STORY_SLUG,
} from "../chapter/chapter.module.code.ts"

const PUT = "change-mechanical/add-file-of-any-kind"
const PROSE = "prose"
const TXT = "txt"
const WORDS = "words"

export class FilingRefused extends Error {}

export function assertStoryExists(): undefined {
  const asked = asking(akashaRoot(), {
    pageTypeSlug: STORY_PAGE_TYPE,
    where: { slug: { is: STORY_SLUG } },
    keys: ["slug"],
    limit: 2,
  })
  if ("refused" in asked) {
    throw new FilingRefused(`${STORY_ADDRESS} went unread: ${asked.refused}`)
  }
  if (asked.rows.length === 0) {
    throw new FilingRefused(
      `no page is at ${STORY_ADDRESS}, so a chapter filed under it would ` +
        `hang off a story that is not there`
    )
  }
  if (asked.rows.length > 1) {
    throw new FilingRefused(`${asked.rows.length} pages are at ${STORY_ADDRESS}`)
  }
}

const STORY_KEYS = ["story", "storySlug"] as const

export function filedChapterLinks(): ReadonlySet<string> {
  const links = new Set<string>()
  for (const key of STORY_KEYS) {
    const asked = asking(akashaRoot(), {
      pageTypeSlug: CHAPTER_PAGE_TYPE,
      where: { [key]: { is: STORY_ADDRESS } },
      keys: ["externalLink"],
    })
    if ("refused" in asked) {
      throw new FilingRefused(
        `the chapters already filed could not be read, so every chapter the table of contents ` +
          `names would read as new and be filed a second time: ${asked.refused}`
      )
    }
    for (const row of asked.rows) {
      const link = row["externalLink"]
      if (typeof link === "string" && link !== "") links.add(link)
    }
  }
  if (links.size === 0) {
    throw new FilingRefused(
      `${CHAPTER_PAGE_TYPE} answered with no chapter at all. The Wandering Inn has chapters on ` +
        `file, so an empty answer is a broken read rather than an empty shelf, and syncing on it ` +
        `would file every chapter a second time.`
    )
  }
  return links
}

export interface Filing {
  readonly position: number
  readonly title: string
  readonly url: string
  readonly text: string
}

export async function fileChapter(chapter: Filing): Promise<string> {
  const root = akashaRoot()
  const slug = chapterPageSlug(chapter.position, chapterSlugOf(chapter.title))
  const values: Value = {
    pageTypeSlug: CHAPTER_PAGE_TYPE,
    slug,
    title: chapter.title,
    story: STORY_ADDRESS,
    position: chapter.position,
    ownLength: countChapterWords(chapter.text),
    unitSlug: WORDS,
    externalLink: chapter.url,
    prose: TXT,
  }
  const day = publishedDayOf(chapter.url)
  if (day !== null) values["publishedAt"] = day

  const composed = composedFor(root, { pageTypeSlug: CHAPTER_PAGE_TYPE, slug, values })
  if ("refused" in composed) {
    throw new FilingRefused(
      `${CHAPTER_PAGE_TYPE}/${slug} was composed by nothing: ${composed.refused}`
    )
  }
  const beside = besideAt(composed.put.path, PROSE, TXT)
  if (beside === null) {
    throw new FilingRefused(
      `${composed.put.path} is no page file, so its prose has no name beside it`
    )
  }
  const answer = await runMechanicalChange(
    root,
    [
      { at: PUT, given: { at: composed.put.path, body: composed.put.content } },
      { at: PUT, given: { at: beside, body: chapter.text } },
    ],
    `file ${CHAPTER_PAGE_TYPE}/${slug}`
  )
  const wrong = "refusals" in answer ? answer.refusals : answer.wrong
  if (wrong.length > 0) {
    throw new FilingRefused(`${CHAPTER_PAGE_TYPE}/${slug} did not land: ${wrong.join("; ")}`)
  }
  return composed.put.path
}
