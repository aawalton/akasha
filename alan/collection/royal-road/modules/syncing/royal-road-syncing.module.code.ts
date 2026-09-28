import {
  type RunCounts,
  recordingRun,
} from "akasha/alan/collection/modules/sync-run-recording/sync-run-recording.module.code.ts"
import {
  type Followed,
  readFollows,
  signedIn,
} from "akasha/alan/collection/royal-road/modules/follows/royal-road-follows.module.code.ts"
import {
  extraPaths,
  type Held,
  heldChapters,
} from "akasha/alan/collection/royal-road/modules/held/royal-road-held.module.code.ts"
import type { RawChapter } from "akasha/alan/collection/royal-road/modules/pages/royal-road-pages.module.code.ts"
import {
  betweenRequests,
  fetchHtml,
  parseChapterProse,
  parseFictionPage,
  royalRoadUrl,
} from "akasha/alan/collection/royal-road/modules/pages/royal-road-pages.module.code.ts"
import { readUpTo } from "akasha/alan/collection/royal-road/modules/reading/royal-road-reading.module.code.ts"
import {
  readStories,
  restatedStory,
  restatementFor,
  type Story,
} from "akasha/alan/collection/royal-road/modules/stories/royal-road-stories.module.code.ts"
import { words } from "akasha/alan/collection/unit/pages/words.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import { addIfNotPresentFile } from "akasha/change/mechanical/file/add-if-not-present-file/add-if-not-present-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFileOfAnyKind } from "akasha/change/mechanical/file/remove/remove-file-of-any-kind/remove-file-of-any-kind.change-mechanical.ts"
import {
  type Asking,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"

import { shortenedToWords } from "akasha/code/type/narrowing/modules/shortened-to-words/shortened-to-words.module.code.ts"
import { refusalsIn } from "akasha/command/modules/applying/applying.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { composedFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const ROOT = akashaRoot()
const STORY_PAGE_TYPE = "story-read"
const CHAPTER_PAGE_TYPE = "story-chapter-read"
const PAGE_TYPE = "page-type"
const SOURCE = "royal-road"
const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const
const RESTATE = `${changeMechanicalFile.slug}/${addIfNotPresentFile.slug}` as const
const REMOVE = `${changeMechanical.slug}/${removeFileOfAnyKind.slug}` as const
const PROSE = "prose"
const TXT = "txt"
const WORDS = `${unit.slug}/${words.slug}` as const
const STORY = "story"
const PROGRESS = "ownProgress"
const POSITION_DIGITS = 4
const BATCH_CEILING = 50
const COMMIT = "--commit"

type Put = Extract<Asking, { at: typeof PUT | typeof RESTATE | typeof REMOVE }>

const TITLE_CEILING = 50
const SLUG_HOLDS = 100

const DAY = /^\d{4}-\d{2}-\d{2}$/

export class SyncRefused extends Error {}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "")
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

const OPENS_WITH = `${STORY_PAGE_TYPE}/`

export interface Filed {
  readonly named: string
  readonly changes: readonly Put[]
}

export function filedChapter(
  story: Story,
  chapter: RawChapter,
  text: string,
  wordCount: number,
  taken: Set<string>,
  read: boolean
): Filed {
  const position = chapter.order + 1
  const stem = chapterPageSlug(story.slug, position, chapter.title, chapter.id, 0)
  const room = chapter.id.length + 1
  const slug = taken.has(stem)
    ? `${chapterPageSlug(story.slug, position, chapter.title, chapter.id, room)}-${chapter.id}`
    : stem
  taken.add(slug)
  const values: Value = {
    type: namedAs(PAGE_TYPE, CHAPTER_PAGE_TYPE, null),
    slug,
    title: chapter.title,
    [STORY]: `${OPENS_WITH}${story.slug}`,
    position,
    ownLength: wordCount,
    unit: WORDS,
    externalIdentity: [
      { source: SOURCE, externalId: chapter.id, externalLink: royalRoadUrl(chapter.url) },
    ],
    prose: TXT,
  }
  if (read) values[PROGRESS] = wordCount
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

interface Counts {
  composed: number
  progressed: number
  skipped: number
  failed: number
  restated: number
  refused: number
  unworlded: number
}

async function syncStory(
  story: Story,
  follows: ReadonlyMap<string, Followed>,
  held: Held,
  taken: Set<string>,
  counts: Counts,
  budget: { left: number },
  filing: Filed[]
): Promise<void> {
  const fictionUrl = royalRoadUrl(`/fiction/${story.externalId}/${story.slug}`)
  const fiction = parseFictionPage(await fetchHtml(fictionUrl))
  await betweenRequests()

  const lastReadId = follows.get(story.externalId)?.lastReadChapterId ?? null
  const lastRead = fiction.chapters.find((one) => one.id === lastReadId)
  const pending = fiction.chapters.filter(
    (one) => one.visible && one.isUnlocked && !held.ids.has(one.id)
  )
  const kept = fiction.chapters.filter((one) => held.ids.has(one.id)).length
  const listed = `${story.slug}: ${fiction.chapters.length} listed, ${kept} held`
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
      await betweenRequests()
      if (!prose.ok) {
        console.log(`    no prose: ${royalRoadUrl(chapter.url)} — ${prose.why}`)
        counts.failed += 1
        continue
      }
      const read = lastRead !== undefined && chapter.order <= lastRead.order
      const filed = filedChapter(story, chapter, prose.text, prose.wordCount, taken, read)
      filing.push(filed)
      console.log(`    + ${filed.named} (${prose.wordCount} words)`)
      counts.composed += 1
    } catch (error) {
      console.log(`    failed: ${chapter.title} — ${String(error)}`)
      counts.failed += 1
    }
  }

  const chapters = held.byStory.get(`${OPENS_WITH}${story.slug}`) ?? []
  const raised = readUpTo(ROOT, chapters, fiction.chapters, lastReadId)
  filing.push(...raised)
  counts.progressed += raised.length

  const wanted = restatementFor(
    story,
    fiction.meta.status,
    fiction.meta.tags,
    follows.has(story.externalId)
  )
  if (wanted === null) return
  if (story.world === null) {
    console.log(
      `    ${STORY_PAGE_TYPE}/${story.slug} not restated: it states no world and ${SOURCE} ` +
        `answers with none. Put a world on that page by hand before it restates.`
    )
    counts.unworlded += 1
    return
  }
  filing.push(restatedStory(ROOT, story, wanted))
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
    const wrong = refusalsIn(answer)
    if (wrong.length > 0) {
      counts.refused += batch.length
      console.log(`  refused ${batch.length} page(s): ${wrong.join("; ")}`)
      continue
    }
    console.log(`  landed ${batch.length} page(s)`)
  }
}

async function syncRoyalRoad(argv: readonly string[]): Promise<RunCounts> {
  const only = argv.includes("--story") ? argv[argv.indexOf("--story") + 1] : undefined
  const limitRaw = argv.includes("--limit") ? argv[argv.indexOf("--limit") + 1] : undefined
  const budget = { left: limitRaw === undefined ? Number.MAX_SAFE_INTEGER : Number(limitRaw) }

  const stories = readStories(ROOT, only)
  const held = heldChapters(ROOT)
  const follows = new Map(
    (await readFollows(await signedIn(ROOT))).map((one) => [one.fictionId, one])
  )
  console.log(`royal road follow list: ${follows.size} fiction(s)`)
  console.log(`royal road sync: ${stories.length} stor${stories.length === 1 ? "y" : "ies"}`)
  const counts: Counts = {
    composed: 0,
    progressed: 0,
    skipped: 0,
    failed: 0,
    restated: 0,
    refused: 0,
    unworlded: 0,
  }
  const taken = new Set(held.slugs)
  const filing: Filed[] = extraPaths(ROOT, held).map((at) => ({
    named: at,
    changes: [{ at: REMOVE, given: { at } }],
  }))
  if (filing.length > 0) console.log(`  ${filing.length} second copies of a chapter to take away`)

  for (const story of stories) {
    try {
      await syncStory(story, follows, held, taken, counts, budget, filing)
    } catch (error) {
      console.log(`  ${story.slug}: failed — ${String(error)}`)
      counts.failed += 1
    }
  }

  if (filing.length === 0) {
    console.log("nothing to land")
  } else if (argv.includes(COMMIT)) {
    await landInBatches(filing, counts)
  } else {
    console.log(`${filing.length} page(s) composed and not landed; --commit lands them`)
    for (const one of filing)
      for (const change of one.changes) console.log(`    ${change.given.at}`)
  }

  console.log(
    `composed ${counts.composed} chapter(s), restated ${counts.restated} story page(s), ` +
      `read ${counts.progressed} chapter(s), skipped ${counts.skipped} over budget, ` +
      `${counts.failed} failed, ${counts.refused} refused, ${counts.unworlded} unrestated for no world`
  )
  return {
    created: counts.composed,
    updated: counts.restated + counts.progressed,
    skipped: counts.skipped,
    failed: counts.failed + counts.refused + counts.unworlded,
  }
}

export async function main(argv: readonly string[]): Promise<number> {
  const syncing = (): Promise<RunCounts> => syncRoyalRoad(argv)
  try {
    const counts = argv.includes(COMMIT) ? await recordingRun(SOURCE, syncing) : await syncing()
    return counts.failed > 0 ? 1 : 0
  } catch (error) {
    console.log(`royal road sync: ${String(error)}`)
    return 1
  }
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
