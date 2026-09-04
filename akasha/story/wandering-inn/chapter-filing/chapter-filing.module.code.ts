import { landedMechanically } from "@akasha/command-system/asking"
import type { FileEdit } from "@akasha/command-system/landing"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { besideAt } from "@akasha/pages-system/page-file-name"
import type { Value } from "@akasha/pages-system/page-value"
import { asking } from "@akasha/pages-system-service/asking"
import { composedFor } from "@akasha/pages-system-service/composing"
import { chapterWords as countChapterWords } from "@akasha/story-engine-core/chapter-words"
import {
  CHAPTER_PAGE_TYPE,
  chapterPageSlug,
  chapterSlugOf,
  publishedDayOf,
  STORY_PAGE_TYPE,
  STORY_SLUG,
} from "../chapter/chapter.module.code.ts"

const CALLED_AS = "wandering-inn-sync"
const PROSE = "prose"
const TXT = "txt"
const WORDS = "words"
const BYTES = new TextEncoder()

export class FilingRefused extends Error {}

export function assertStoryStands(): undefined {
  const asked = asking(akashaRoot(), {
    pageTypeSlug: STORY_PAGE_TYPE,
    where: { slug: { is: STORY_SLUG } },
    keys: ["slug"],
    limit: 2,
  })
  if ("refused" in asked) {
    throw new FilingRefused(`${STORY_PAGE_TYPE}/${STORY_SLUG} went unread: ${asked.refused}`)
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

export function filedChapterLinks(): ReadonlySet<string> {
  const asked = asking(akashaRoot(), {
    pageTypeSlug: CHAPTER_PAGE_TYPE,
    where: { partOfSlugs: { has: STORY_SLUG } },
    keys: ["externalLink"],
  })
  if ("refused" in asked) {
    throw new FilingRefused(
      `the chapters already filed could not be read, so every chapter the table of contents ` +
        `names would read as new and be filed a second time: ${asked.refused}`
    )
  }
  const links = new Set<string>()
  for (const row of asked.rows) {
    const link = row["externalLink"]
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

export function fileChapter(chapter: Filing): string {
  const root = akashaRoot()
  const slug = chapterPageSlug(chapter.position, chapterSlugOf(chapter.title))
  const values: Value = {
    pageTypeSlug: CHAPTER_PAGE_TYPE,
    slug,
    title: chapter.title,
    partOfSlugs: [STORY_SLUG],
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
  const changes: readonly FileEdit[] = [
    { path: composed.put.path, body: BYTES.encode(composed.put.content) },
    { path: beside, body: BYTES.encode(chapter.text) },
  ]
  const answer = landedMechanically(root, CALLED_AS, changes, `file ${CHAPTER_PAGE_TYPE}/${slug}`)
  if (answer.code !== 0) {
    throw new FilingRefused(
      `${CHAPTER_PAGE_TYPE}/${slug} did not land: ${answer.refusals.join("; ")}`
    )
  }
  return composed.put.path
}
