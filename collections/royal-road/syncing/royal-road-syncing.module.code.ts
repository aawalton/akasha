import { type Asking, runMechanicalChange } from "@akasha/changes/mechanical-change-running"
import { akashaRoot } from "@akasha/pages/checkout-roots"
import { besideAt } from "@akasha/pages/page-file-name"
import type { Value } from "@akasha/pages/page-value"
import { asking, type Row } from "@akasha/pages-service/asking"
import { composedFor } from "@akasha/pages-service/composing"
import type { RawChapter } from "@akasha/royal-road/royal-road-pages"
import {
  fetchHtml,
  parseChapterProse,
  parseFictionPage,
  royalRoadUrl,
} from "@akasha/royal-road/royal-road-pages"

const ROOT = akashaRoot()
const STORY_PAGE_TYPE = "story-read"
const CHAPTER_PAGE_TYPE = "story-chapter-read"
const SOURCE = "royal-road"
const PUT = "change-mechanical/add-file-of-any-kind"
const RESTATE = "change-mechanical-file/add-if-not-present-file"
const PROSE = "prose"
const TXT = "txt"
const WORDS = "words"
const STORY = "story"
const STORY_SLUG = "storySlug"
const REQUEST_DELAY_MS = 1500
const POSITION_DIGITS = 4
const BATCH_CEILING = 50

type Put = Extract<Asking, { at: typeof PUT | typeof RESTATE }>

const TITLE_CEILING = 50
const SLUG_HOLDS = 100

const DAY = /^\d{4}-\d{2}-\d{2}$/
const CHAPTER_AT = /\/chapter\/(\d+)/

const STATUS_KEPT = new Set(["ongoing", "completed", "hiatus"])

export class SyncRefused extends Error {}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function shortenedToWords(whole: string, ceiling: number): string {
  if (whole.length <= ceiling) return whole
  const words = whole.split("-")
  let out = words[0] ?? ""
  for (const word of words.slice(1)) {
    if (out.length + 1 + word.length > ceiling) break
    out = `${out}-${word}`
  }
  return out.length <= ceiling ? out : out.slice(0, ceiling).replace(/-+$/, "")
}

export function chapterPageSlug(
  storySlug: string,
  position: number,
  title: string,
  fallback: string,
  room: number
): string {
  const opening = `${storySlug}-${String(position).padStart(POSITION_DIGITS, "0")}-`
  const said = slugify(title)
  const ceiling = Math.min(TITLE_CEILING, SLUG_HOLDS - opening.length - room)
  return `${opening}${shortenedToWords(said === "" ? fallback : said, ceiling)}`
}

function textIn(row: Row, key: string): string | null {
  const held = row[key]
  return typeof held === "string" && held !== "" ? held : null
}

function listIn(row: Row, key: string): readonly string[] {
  const held = row[key]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

export interface Story {
  readonly slug: string
  readonly externalId: string
  readonly world: string | null
  readonly status: string | null
  readonly tags: readonly string[]
}

export function readStories(only: string | undefined): readonly Story[] {
  const asked = asking(ROOT, {
    pageTypeSlug: STORY_PAGE_TYPE,
    where: { source: { is: SOURCE } },
    keys: ["slug", "externalId", "world", "worldSlug", "publicationStatus", "externalTags"],
  })
  if ("refused" in asked)
    throw new SyncRefused(`the stories to follow went unread: ${asked.refused}`)
  if (asked.rows.length === 0) {
    throw new SyncRefused(
      `${STORY_PAGE_TYPE} answered with no story read from ${SOURCE}. An empty answer is a ` +
        `broken read rather than an empty shelf.`
    )
  }
  const out: Story[] = []
  for (const row of asked.rows) {
    const slug = textIn(row, "slug")
    if (slug === null) continue
    if (only !== undefined && slug !== only) continue
    const externalId = textIn(row, "externalId")
    if (externalId === null) {
      console.log(`skip ${slug}: no externalId`)
      continue
    }
    out.push({
      slug,
      externalId,
      world: textIn(row, "world") ?? textIn(row, "worldSlug"),
      status: textIn(row, "publicationStatus"),
      tags: listIn(row, "externalTags"),
    })
  }
  return out
}

const OPENS_WITH = `${STORY_PAGE_TYPE}/`

export function storySlugOf(held: unknown): string | null {
  if (typeof held !== "string" || held === "") return null
  return held.startsWith(OPENS_WITH) ? held.slice(OPENS_WITH.length) : held
}

export interface Held {
  readonly idsByStory: ReadonlyMap<string, ReadonlySet<string>>
  readonly slugs: ReadonlySet<string>
}

export function chapterIdIn(row: Row): string | null {
  const id = textIn(row, "externalId")
  if (id !== null) return id
  const link = textIn(row, "externalLink")
  return link === null ? null : (CHAPTER_AT.exec(link)?.[1] ?? null)
}

export function heldChapters(): Held {
  const asked = asking(ROOT, {
    pageTypeSlug: CHAPTER_PAGE_TYPE,
    keys: ["slug", "externalId", "externalLink", STORY, STORY_SLUG],
  })
  if ("refused" in asked) {
    throw new SyncRefused(
      `the chapters already filed went unread, so every chapter royal road lists would read as ` +
        `new and be filed again: ${asked.refused}`
    )
  }
  if (asked.rows.length === 0) {
    throw new SyncRefused(
      `${CHAPTER_PAGE_TYPE} answered with no chapter at all. An empty answer is a broken read ` +
        `rather than an empty shelf, and syncing on it would file every chapter a second time.`
    )
  }
  const slugs = new Set<string>()
  const idsByStory = new Map<string, Set<string>>()
  for (const row of asked.rows) {
    const slug = textIn(row, "slug")
    if (slug !== null) slugs.add(slug)
    const id = chapterIdIn(row)
    if (id === null) continue
    const story = storySlugOf(row[STORY] ?? row[STORY_SLUG])
    if (story === null) continue
    const ids = idsByStory.get(story) ?? new Set<string>()
    ids.add(id)
    idsByStory.set(story, ids)
  }
  return { idsByStory, slugs }
}

export interface Filed {
  readonly named: string
  readonly changes: readonly Put[]
}

export function filedChapter(
  story: Story,
  chapter: RawChapter,
  text: string,
  wordCount: number,
  taken: Set<string>
): Filed {
  const position = chapter.order + 1
  const stem = chapterPageSlug(story.slug, position, chapter.title, chapter.id, 0)
  const room = chapter.id.length + 1
  const slug = taken.has(stem)
    ? `${chapterPageSlug(story.slug, position, chapter.title, chapter.id, room)}-${chapter.id}`
    : stem
  taken.add(slug)
  const values: Value = {
    pageTypeSlug: CHAPTER_PAGE_TYPE,
    slug,
    title: chapter.title,
    [STORY]: `${OPENS_WITH}${story.slug}`,
    position,
    ownLength: wordCount,
    unitSlug: WORDS,
    externalLink: royalRoadUrl(chapter.url),
    externalId: chapter.id,
    source: SOURCE,
    prose: TXT,
  }
  const day = chapter.date.slice(0, 10)
  if (DAY.test(day)) values["publishedAt"] = day
  const named = `${CHAPTER_PAGE_TYPE}/${slug}`
  const composed = composedFor(ROOT, { pageTypeSlug: CHAPTER_PAGE_TYPE, slug, values })
  if ("refused" in composed) {
    throw new SyncRefused(`${named} was composed by nothing: ${composed.refused}`)
  }
  const beside = besideAt(composed.put.path, PROSE, TXT)
  if (beside === null) {
    throw new SyncRefused(
      `${composed.put.path} is no page file, so its prose has no name beside it`
    )
  }
  return {
    named,
    changes: [
      { at: PUT, given: { at: composed.put.path, body: composed.put.content } },
      { at: PUT, given: { at: beside, body: text } },
    ],
  }
}

export function restatementFor(
  story: Story,
  status: string | null,
  tags: readonly string[]
): Value | null {
  const values: Value = {}
  const wanted = status === null ? null : status.toLowerCase()
  if (wanted !== null && STATUS_KEPT.has(wanted) && wanted !== story.status) {
    values["publicationStatus"] = wanted
  }
  const sameTags =
    tags.length === story.tags.length && tags.every((tag, i) => tag === story.tags[i])
  if (tags.length > 0 && !sameTags) values["externalTags"] = [...tags]
  return Object.keys(values).length === 0 ? null : values
}

export function restatedStory(story: Story, values: Value): Filed {
  const named = `${STORY_PAGE_TYPE}/${story.slug}`
  const composed = composedFor(ROOT, {
    pageTypeSlug: STORY_PAGE_TYPE,
    slug: story.slug,
    values: { ...values, pageTypeSlug: STORY_PAGE_TYPE, slug: story.slug },
    merge: true,
  })
  if ("refused" in composed) {
    throw new SyncRefused(`${named} was composed by nothing: ${composed.refused}`)
  }
  return {
    named,
    changes: [{ at: RESTATE, given: { at: composed.put.path, body: composed.put.content } }],
  }
}

interface Counts {
  composed: number
  skipped: number
  failed: number
  restated: number
  refused: number
  unworlded: number
}

async function syncStory(
  story: Story,
  held: Held,
  taken: Set<string>,
  counts: Counts,
  budget: { left: number },
  filing: Filed[]
): Promise<void> {
  const fictionUrl = royalRoadUrl(`/fiction/${story.externalId}/${story.slug}`)
  const fiction = parseFictionPage(await fetchHtml(fictionUrl))
  await delay(REQUEST_DELAY_MS)

  const ids = held.idsByStory.get(story.slug) ?? new Set<string>()
  const pending = fiction.chapters.filter(
    (one) => one.visible && one.isUnlocked && !ids.has(one.id)
  )
  const listed = `${story.slug}: ${fiction.chapters.length} listed, ${ids.size} held`
  console.log(
    pending.length === 0 ? `  ${listed}, nothing new` : `  ${listed}, ${pending.length} new`
  )

  for (const chapter of pending) {
    if (budget.left <= 0) {
      counts.skipped += 1
      continue
    }
    budget.left -= 1
    try {
      const prose = parseChapterProse(await fetchHtml(royalRoadUrl(chapter.url)))
      await delay(REQUEST_DELAY_MS)
      if (!prose.ok) {
        console.log(`    no prose: ${royalRoadUrl(chapter.url)} — ${prose.why}`)
        counts.failed += 1
        continue
      }
      const filed = filedChapter(story, chapter, prose.text, prose.wordCount, taken)
      filing.push(filed)
      console.log(`    + ${filed.named} (${prose.wordCount} words)`)
      counts.composed += 1
    } catch (error) {
      console.log(`    failed: ${chapter.title} — ${String(error)}`)
      counts.failed += 1
    }
  }

  const wanted = restatementFor(story, fiction.meta.status, fiction.meta.tags)
  if (wanted === null) return
  if (story.world === null) {
    console.log(
      `    ${STORY_PAGE_TYPE}/${story.slug} not restated: it states no world and ${SOURCE} ` +
        `answers with none. Put a world on that page by hand before it restates.`
    )
    counts.unworlded += 1
    return
  }
  filing.push(restatedStory(story, wanted))
  console.log(`    restated ${STORY_PAGE_TYPE}/${story.slug}`)
  counts.restated += 1
}

export async function landInBatches(filing: readonly Filed[], counts: Counts): Promise<void> {
  for (let at = 0; at < filing.length; at += BATCH_CEILING) {
    const batch = filing.slice(at, at + BATCH_CEILING)
    const changes = batch.flatMap((one) => [...one.changes])
    const answer = await runMechanicalChange(
      ROOT,
      changes,
      `royal road sync ${batch.length} page(s)`
    )
    const wrong = "refusals" in answer ? answer.refusals : answer.wrong
    if (wrong.length > 0) {
      counts.refused += batch.length
      console.log(`  refused ${batch.length} page(s): ${wrong.join("; ")}`)
      continue
    }
    console.log(`  landed ${batch.length} page(s)`)
  }
}

export async function main(argv: readonly string[]): Promise<number> {
  const only = argv.includes("--story") ? argv[argv.indexOf("--story") + 1] : undefined
  const limitRaw = argv.includes("--limit") ? argv[argv.indexOf("--limit") + 1] : undefined
  const budget = { left: limitRaw === undefined ? Number.MAX_SAFE_INTEGER : Number(limitRaw) }

  let stories: readonly Story[]
  let held: Held
  try {
    stories = readStories(only)
    held = heldChapters()
  } catch (error) {
    console.log(`royal road sync: ${String(error)}`)
    return 1
  }
  console.log(`royal road sync: ${stories.length} stor${stories.length === 1 ? "y" : "ies"}`)
  const counts: Counts = {
    composed: 0,
    skipped: 0,
    failed: 0,
    restated: 0,
    refused: 0,
    unworlded: 0,
  }
  const taken = new Set(held.slugs)
  const filing: Filed[] = []

  for (const story of stories) {
    try {
      await syncStory(story, held, taken, counts, budget, filing)
    } catch (error) {
      console.log(`  ${story.slug}: failed — ${String(error)}`)
      counts.failed += 1
    }
  }

  if (filing.length === 0) {
    console.log("nothing to land")
  } else if (argv.includes("--commit")) {
    await landInBatches(filing, counts)
  } else {
    console.log(`${filing.length} page(s) composed and not landed; --commit lands them`)
    for (const one of filing)
      for (const change of one.changes) console.log(`    ${change.given.at}`)
  }

  console.log(
    `composed ${counts.composed} chapter(s), restated ${counts.restated} story page(s), ` +
      `skipped ${counts.skipped} over budget, ${counts.failed} failed, ${counts.refused} refused, ` +
      `${counts.unworlded} unrestated for no world`
  )
  return counts.refused > 0 || counts.failed > 0 || counts.unworlded > 0 ? 1 : 0
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
