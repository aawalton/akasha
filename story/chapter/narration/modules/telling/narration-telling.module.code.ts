import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type { Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  askingFor,
  filingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  type NarrationSegment,
  narrationSegmentsOf,
  type Pronunciation,
  respellerOf,
  sentencesOf,
} from "akasha/story/chapter/narration/modules/segments/narration-segments.module.code.ts"
import { wordCount } from "akasha/story/engine/core/modules/word-count/word-count.module.code.ts"

const VOICE = "af_heart"

const VOICE_ORIGIN_ENV = "VOICE_INFER_ORIGIN"

const VOICE_ORIGIN = "http://voice-infer.voice.svc.cluster.local:8080"

const NARRATION_AT = "/v1/narration"

const TITLE_PAUSE_MS = 900

const SPEECH_CEILING_MS = 15_000

const MOST_SEGMENTS = 3000

const PROSE = "prose"

const CHAPTER_KEYS = [
  "id",
  "slug",
  "title",
  "story",
  "position",
  "ownLength",
  "ownProgress",
  "completedAt",
]

const AFTER_LOOKED_AT = 8

const NARRATION_ID = /^[A-Za-z0-9_-]{8,64}$/

const PIECE_NAME = /^(?:playlist\.m3u8|chapters|init\.mp4|p\d{1,6}\.m4s)$/

const PASSED_HEADERS = ["content-type", "cache-control", "content-length"]

export type ChapterHeld = {
  readonly id: string
  readonly pageTypeSlug: string
  readonly slug: string
  readonly title: string
  readonly storyTitle: string
  readonly ownLength: number | null
  readonly ownProgress: number | null
  readonly completedAt: string | null
}

type ReadProgress = {
  readonly ownProgress: number | null
  readonly ownLength: number | null
}

const UNREAD: ReadProgress = { ownProgress: null, ownLength: null }

type Told<T> = { readonly held: T } | { readonly refused: string; readonly status: number }

type ChapterRow = ChapterHeld & {
  readonly story: string
  readonly position: number | null
  readonly pronunciations: readonly Pronunciation[]
}

type StoryHeld = { readonly title: string; readonly world: string | null }

export function refusedAnswer(error: string, status: number, headers: Headers): Response {
  return Response.json({ ok: false, error }, { status, headers })
}

export function narrationIdIs(id: string): boolean {
  return NARRATION_ID.test(id)
}

export function pieceNameIs(name: string): boolean {
  return PIECE_NAME.test(name)
}

function resumedAt(
  segments: readonly NarrationSegment[],
  { ownProgress, ownLength }: ReadProgress
): number {
  if (ownProgress === null || ownProgress <= 0) return 0
  if (ownLength !== null && ownProgress >= ownLength) return 0
  let at = 0
  segments.forEach((one, index) => {
    if (one.wordStart <= ownProgress) at = index
  })
  return at
}

export function spokenSegmentsOf(
  title: string,
  prose: string,
  progress: ReadProgress = UNREAD,
  pronunciations: readonly Pronunciation[] = []
): NarrationSegment[] {
  const total = wordCount(prose)
  const length = progress.ownLength
  const scale = length !== null && length > 0 && total > 0 ? length / total : 1
  const all = narrationSegmentsOf(prose, pronunciations).map((one) => ({
    ...one,
    wordStart: Math.round(one.wordStart * scale),
  }))
  const from = resumedAt(all, progress)
  const kept = all.slice(from)
  const said = respellerOf(pronunciations)(title.trim())
  const opening =
    said === "" || from > 0 ? [] : [{ text: said, pauseAfterMs: TITLE_PAUSE_MS, wordStart: 0 }]
  return [...opening, ...kept]
}

type SentenceStart = readonly [charIndex: number, wordStart: number]

type TimedSegment = NarrationSegment & { readonly sentences: readonly SentenceStart[] }

export function withSentences(segments: readonly NarrationSegment[]): TimedSegment[] {
  return segments.map((one, at) => {
    const words = wordCount(one.text)
    const next = segments[at + 1]?.wordStart
    const span = next !== undefined && next > one.wordStart ? next - one.wordStart : words
    const starts: SentenceStart[] = []
    let cursor = 0
    let said = 0
    sentencesOf(one.text).forEach((sentence, index) => {
      const char = one.text.indexOf(sentence, cursor)
      if (char < 0) return
      cursor = char + sentence.length
      const wordStart = one.wordStart + (words === 0 ? 0 : Math.floor((said / words) * span))
      if (index > 0 && wordStart > (starts.at(-1)?.[1] ?? one.wordStart)) {
        starts.push([char, wordStart])
      }
      said += wordCount(sentence)
    })
    return { ...one, sentences: starts }
  })
}

export function nextAmong(rows: readonly Row[], position: number): Row | null {
  let found: Row | null = null
  let foundAt = Number.POSITIVE_INFINITY
  for (const row of rows) {
    const at = asNumber(row.position)
    if (at === null || at <= position || at >= foundAt) continue
    found = row
    foundAt = at
  }
  return found
}

export function storyNamed(story: string): { pageTypeSlug: string; slug: string } | null {
  const at = story.indexOf("/")
  if (at <= 0 || at === story.length - 1) return null
  return { pageTypeSlug: story.slice(0, at), slug: story.slice(at + 1) }
}

function voiceOrigin(): string {
  const said = process.env[VOICE_ORIGIN_ENV]
  return said === undefined || said === "" ? VOICE_ORIGIN : said.replace(/\/+$/, "")
}

function refused<T>(why: string, status: number): Told<T> {
  return { refused: why, status }
}

const NO_STORY: StoryHeld = { title: "", world: null }

async function storyOf(story: string): Promise<StoryHeld> {
  const named = storyNamed(story)
  if (named === null) return NO_STORY
  const found = await askingFor({
    pageTypeSlug: named.pageTypeSlug,
    where: { slug: { is: named.slug } },
    keys: ["title", "world"],
    limit: 1,
  })
  if ("refused" in found) return NO_STORY
  const row = found.rows[0]
  return { title: textIn(row?.title) ?? "", world: textIn(row?.world) }
}

async function pronunciationsOf(world: string | null): Promise<readonly Pronunciation[]> {
  if (world === null) return []
  const found = await askingFor({
    pageTypeSlug: "pronunciation",
    where: { world: { is: world } },
    keys: ["title", "spokenAs"],
  })
  if ("refused" in found) return []
  return found.rows.flatMap((row) => {
    const written = textIn(row.title)
    const spokenAs = textIn(row.spokenAs)
    return written === null || spokenAs === null ? [] : [{ written, spokenAs }]
  })
}

async function rowHeld(pageTypeSlug: string, row: Row): Promise<Told<ChapterRow>> {
  const id = textIn(row.id)
  const slug = textIn(row.slug)
  if (id === null || slug === null) return refused("the chapter states no id or slug", 500)
  const story = textIn(row.story) ?? ""
  const told = await storyOf(story)
  return {
    held: {
      id,
      pageTypeSlug,
      slug,
      title: textIn(row.title) ?? "",
      storyTitle: told.title,
      pronunciations: await pronunciationsOf(told.world),
      ownLength: asNumber(row.ownLength),
      ownProgress: asNumber(row.ownProgress),
      completedAt: textIn(row.completedAt),
      story,
      position: asNumber(row.position),
    },
  }
}

async function chapterOf(pageTypeSlug: string, slug: string): Promise<Told<ChapterRow>> {
  const found = await askingFor({
    pageTypeSlug,
    where: { slug: { is: slug } },
    keys: CHAPTER_KEYS,
    limit: 1,
  })
  if ("refused" in found) return refused(found.refused, 503)
  const row = found.rows[0]
  if (row === undefined) return refused(`no ${pageTypeSlug} page is named \`${slug}\``, 404)
  return rowHeld(pageTypeSlug, row)
}

async function segmentsOf(chapter: ChapterRow): Promise<Told<NarrationSegment[]>> {
  const filed = await filingFor({
    pageTypeSlug: chapter.pageTypeSlug,
    slug: chapter.slug,
    key: PROSE,
  })
  if ("refused" in filed)
    return refused(`the chapter's prose would not read: ${filed.refused}`, 404)
  const segments = spokenSegmentsOf(
    chapter.title,
    new TextDecoder().decode(filed.bytes),
    chapter,
    chapter.pronunciations
  )
  if (segments.length === 0) return refused("the chapter has no words to narrate", 422)
  if (segments.length > MOST_SEGMENTS) {
    return refused(
      `the chapter runs to ${segments.length} segments, past the ${MOST_SEGMENTS} one narration takes`,
      413
    )
  }
  return { held: segments }
}

function errorIn(said: unknown): string | null {
  if (said === null || typeof said !== "object") return null
  return textIn((said as { error?: unknown }).error)
}

async function voiceSent(path: string, method: string, body?: unknown): Promise<Told<unknown>> {
  let answered: Response
  try {
    answered = await fetch(`${voiceOrigin()}${path}`, {
      method,
      headers: body === undefined ? {} : { "content-type": "application/json" },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      signal: AbortSignal.timeout(SPEECH_CEILING_MS),
    })
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return refused(`the speech workload could not be reached: ${why}`, 502)
  }
  let said: unknown = null
  try {
    said = await answered.json()
  } catch {
    said = null
  }
  if (answered.ok) return { held: said }
  return refused(
    `the speech workload answered ${answered.status}: ${errorIn(said) ?? "no reason"}`,
    502
  )
}

function heldOf(chapter: ChapterRow): ChapterHeld {
  return {
    id: chapter.id,
    pageTypeSlug: chapter.pageTypeSlug,
    slug: chapter.slug,
    title: chapter.title,
    storyTitle: chapter.storyTitle,
    ownLength: chapter.ownLength,
    ownProgress: chapter.ownProgress,
    completedAt: chapter.completedAt,
  }
}

export async function narrationOpened(
  pageTypeSlug: string,
  slug: string
): Promise<Told<{ id: string; chapter: ChapterHeld }>> {
  const chapter = await chapterOf(pageTypeSlug, slug)
  if ("refused" in chapter) return chapter
  const segments = await segmentsOf(chapter.held)
  if ("refused" in segments) return segments
  const opened = await voiceSent(NARRATION_AT, "POST", {
    voice: VOICE,
    chapter: { id: chapter.held.id, title: chapter.held.title },
    segments: withSentences(segments.held),
  })
  if ("refused" in opened) return opened
  const id =
    opened.held !== null && typeof opened.held === "object"
      ? textIn((opened.held as { id?: unknown }).id)
      : null
  if (id === null || !narrationIdIs(id)) {
    return refused("the speech workload opened a narration naming no id", 502)
  }
  return { held: { id, chapter: heldOf(chapter.held) } }
}

async function chapterAfter(chapter: ChapterRow): Promise<Told<ChapterRow | null>> {
  if (chapter.story === "" || chapter.position === null) return { held: null }
  const found = await askingFor({
    pageTypeSlug: chapter.pageTypeSlug,
    where: { story: { is: chapter.story }, position: { after: chapter.position } },
    keys: CHAPTER_KEYS,
    sortBy: "position",
    limit: AFTER_LOOKED_AT,
  })
  if ("refused" in found) return refused(found.refused, 503)
  const row = nextAmong(found.rows, chapter.position)
  if (row === null) return { held: null }
  return rowHeld(chapter.pageTypeSlug, row)
}

export async function narrationCarriedOn(
  id: string,
  pageTypeSlug: string,
  slug: string
): Promise<Told<{ chapter: ChapterHeld | null }>> {
  const playing = await chapterOf(pageTypeSlug, slug)
  if ("refused" in playing) return playing
  const after = await chapterAfter(playing.held)
  if ("refused" in after) return after
  const at = `${NARRATION_AT}/${encodeURIComponent(id)}`
  if (after.held === null) {
    const ended = await voiceSent(`${at}/end`, "POST")
    return "refused" in ended ? ended : { held: { chapter: null } }
  }
  const segments = await segmentsOf(after.held)
  if ("refused" in segments) return segments
  const added = await voiceSent(`${at}/chapters`, "POST", {
    chapter: { id: after.held.id, title: after.held.title },
    segments: withSentences(segments.held),
  })
  if ("refused" in added) return added
  return { held: { chapter: heldOf(after.held) } }
}

export async function narrationClosed(id: string): Promise<Told<null>> {
  const closed = await voiceSent(`${NARRATION_AT}/${encodeURIComponent(id)}`, "DELETE")
  return "refused" in closed ? closed : { held: null }
}

export async function narrationPassedThrough(
  id: string,
  name: string,
  signal: AbortSignal
): Promise<Response> {
  let answered: Response
  try {
    answered = await fetch(
      `${voiceOrigin()}${NARRATION_AT}/${encodeURIComponent(id)}/${encodeURIComponent(name)}`,
      { signal }
    )
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return Response.json(
      { error: `the speech workload could not be reached: ${why}` },
      { status: 502 }
    )
  }
  const headers = new Headers()
  for (const key of PASSED_HEADERS) {
    const value = answered.headers.get(key)
    if (value !== null) headers.set(key, value)
  }
  headers.set("X-Content-Type-Options", "nosniff")
  return new Response(answered.body, { status: answered.status, headers })
}
