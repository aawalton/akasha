import { chapterWords as countChapterWords } from "@akasha/story-engine-core/chapter-words"
import { askComposed, pageLanding } from "@tools/lib/page-query-client"
import {
  CHAPTER_PAGE_TYPE,
  chapterPageName,
  chapterSlugOf,
  publishedDayOf,
  STORY_PAGE_TYPE,
  STORY_SLUG,
} from "../chapter/chapter.module.code.ts"

const WRITER = "wandering-inn-sync"

export class FilingRefused extends Error {}

export async function assertStoryStands(): Promise<void> {
  const asked = await askComposed({
    "page-type": STORY_PAGE_TYPE,
    where: { slug: { is: STORY_SLUG } },
    keys: ["slug"],
    limit: 2,
  })
  if (!asked.ok) {
    throw new FilingRefused(`${STORY_PAGE_TYPE}/${STORY_SLUG} went unread: ${asked.why}`)
  }
  if (asked.rows.length === 0) {
    throw new FilingRefused(
      `no page stands at ${STORY_PAGE_TYPE}/${STORY_SLUG}, so a chapter filed under it would ` +
        `hang off a story that is not there`
    )
  }
  if (asked.rows.length > 1) {
    throw new FilingRefused(`${asked.rows.length} pages stand at ${STORY_PAGE_TYPE}/${STORY_SLUG}`)
  }
}

export async function filedChapterLinks(): Promise<ReadonlySet<string>> {
  const asked = await askComposed({
    "page-type": CHAPTER_PAGE_TYPE,
    where: { partOf: { is: STORY_SLUG } },
    keys: ["link"],
  })
  if (!asked.ok) {
    throw new FilingRefused(
      `the chapters already filed could not be read, so every chapter the table of contents ` +
        `names would read as new and be filed a second time: ${asked.why}`
    )
  }
  const links = new Set<string>()
  for (const row of asked.rows) {
    const link = row.values["link"]
    if (typeof link === "string" && link !== "") links.add(link)
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
  const slug = chapterSlugOf(chapter.title)
  const values: Record<string, string | number> = {
    title: chapter.title,
    slug,
    partOf: STORY_SLUG,
    position: chapter.position,
    ownLength: countChapterWords(chapter.text),
    unit: "words",
    link: chapter.url,
    body: chapter.text,
  }
  const day = publishedDayOf(chapter.url)
  if (day !== null) values.publishedAt = day

  const name = chapterPageName(chapter.position, slug)
  const landed = await pageLanding("write", CHAPTER_PAGE_TYPE, name, values, WRITER)
  if (!landed.ok) {
    throw new FilingRefused(`${CHAPTER_PAGE_TYPE}/${name} did not land: ${landed.why}`)
  }
  return landed.at
}
