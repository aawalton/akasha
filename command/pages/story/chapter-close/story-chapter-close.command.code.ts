import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { words } from "akasha/alan/collection/unit/pages/words.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { story as storyArgument } from "akasha/command/argument/pages/story.argument.ts"
import { through as throughArgument } from "akasha/command/argument/pages/through.argument.ts"
import { title as titleArgument } from "akasha/command/argument/pages/title.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  keeping,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { storyChapterClose as page } from "akasha/command/pages/story/chapter-close/story-chapter-close.command.ts"
import { beatsHeld } from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import {
  listedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  foldedFor,
  type Naming,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  putting,
  taking,
} from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import { beats as beatsFile } from "akasha/story/chapter/properties/beats.file-property.ts"
import {
  type Beats,
  beatsJoined,
  beatsWritten,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { wordCount } from "akasha/story/engine/core/modules/word-count/word-count.module.code.ts"
import { storyChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

const NAMED = [storyArgument, throughArgument, titleArgument] as const

const PROSE = "prose"
const HELD = "txt"
const UTF8 = "utf8"
const PARTED = "/"
const GAP = "\n\n"
const BREAK = "\n"
const PADDED = 4
const ZERO = "0"
const WORDS = `${unit.slug}/${words.slug}` as const
const COLLECTIONS = "partOfCollections"
const STORY = "story"
const POSITION = "position"
const COVER = "cover"
const COVER_AFTER = "coverAfter"
const ENDS_AT = "endsAt"
const SLUG = "slug"
const BEATS = beatsFile.propertySlug
const BEATS_HELD = "jsonl"

const A_NOT_SLUG = /[^a-z0-9]+/g
const AN_EDGE_DASH = /^-|-$/g

type Taken = { readonly story: string; readonly through: number; readonly title: string }

type Read = Taken | { readonly refused: string }

type Turn = {
  readonly at: string
  readonly slug: string
  readonly position: number
  readonly cover?: string
  readonly coverAfter?: string
  readonly endsAt?: string
  readonly beats?: string
}

type TurnCover = {
  readonly position: number
  readonly cover: string
  readonly coverAfter?: string
}

type LastTurn = { readonly lastTurn: string; readonly lastTurnPosition: number }

export function taken(argv: readonly string[], calledAs: string): Read {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const held = read.taken
  const story = held.story.trim()
  if (story === "") return { refused: `\`${storyArgument.said}\` names no story` }
  const title = held.title.trim()
  if (title === "") return { refused: `\`${titleArgument.said}\` names no title` }
  const through = held.through
  if (!Number.isInteger(through) || through < 1) {
    return { refused: `\`${throughArgument.said}\` takes a whole number of one or more` }
  }
  return { story, through, title }
}

function slugOf(title: string): string {
  return title.toLowerCase().replace(A_NOT_SLUG, "-").replace(AN_EDGE_DASH, "")
}

export function chapterSlugOf(story: string, position: number, title: string): string {
  return `${story}-${String(position).padStart(PADDED, ZERO)}-${slugOf(title)}`
}

export function proseOf(turns: readonly string[]): string {
  return `${turns.map((one) => one.trim()).join(GAP)}${BREAK}`
}

export function openThrough(turns: readonly Turn[], through: number): readonly Turn[] {
  return turns
    .filter((one) => one.position <= through)
    .toSorted((one, other) => one.position - other.position)
}

const PARAGRAPH_BREAK = /\n\s*\n/
const WINDOW_OPENS = ":::"
const OPENING_WORDS = 12
const WHITESPACE = /\s+/

export function lastOpeningOf(prose: string): string | undefined {
  const paragraphs = prose
    .split(PARAGRAPH_BREAK)
    .map((one) => one.trim())
    .filter((one) => one !== "" && !one.startsWith(WINDOW_OPENS))
  const last = paragraphs.at(-1)
  if (last === undefined) return undefined
  return last.split(WHITESPACE).slice(0, OPENING_WORDS).join(" ")
}

export function anchoredOf(turns: readonly Turn[], texts: readonly string[]): readonly Turn[] {
  return turns.map((one, at) => {
    if (one.cover === undefined || one.coverAfter !== undefined) return one
    const coverAfter = lastOpeningOf(texts[at] ?? "")
    return coverAfter === undefined ? one : { ...one, coverAfter }
  })
}

export function turnCoversOf(turns: readonly Turn[]): readonly TurnCover[] {
  const held: TurnCover[] = []
  for (const one of turns) {
    if (one.cover === undefined) continue
    held.push({
      position: one.position,
      cover: one.cover,
      ...(one.coverAfter === undefined ? {} : { coverAfter: one.coverAfter }),
    })
  }
  return held
}

export function lastTurnOf(turns: readonly Turn[]): LastTurn | null {
  let last: Turn | null = null
  for (const one of turns) if (last === null || one.position > last.position) last = one
  return last === null ? null : { lastTurn: last.slug, lastTurnPosition: last.position }
}

export function endsAtOf(turns: readonly Turn[]): { readonly endsAt: string } | null {
  let last: Turn | null = null
  for (const one of turns) if (last === null || one.position > last.position) last = one
  return last?.endsAt === undefined ? null : { endsAt: last.endsAt }
}

export function chapterBeatsOf(each: readonly Beats[]): string | null {
  const joined = beatsJoined(each)
  return joined.beats.length === 0 ? null : beatsWritten(joined)
}

function storyOf(slug: string): string {
  const parted = slug.lastIndexOf(PARTED)
  return parted < 0 ? slug : slug.slice(parted + 1)
}

function turnsOf(root: string, named: string): readonly Turn[] {
  const found: Turn[] = []
  for (const one of valuesOfType(root, storyTurnPlayed.slug)) {
    const within = one.value[COLLECTIONS]
    const position = one.value[POSITION]
    const slug = one.value[SLUG]
    if (!Array.isArray(within) || !within.includes(named)) continue
    if (typeof position !== "number" || typeof slug !== "string") continue
    const cover = one.value[COVER]
    const coverAfter = one.value[COVER_AFTER]
    const endsAt = one.value[ENDS_AT]
    const beats = one.value[BEATS]
    found.push({
      at: one.path,
      slug,
      position,
      ...(typeof cover === "string" && cover !== "" ? { cover } : {}),
      ...(typeof coverAfter === "string" && coverAfter !== "" ? { coverAfter } : {}),
      ...(typeof endsAt === "string" && endsAt !== "" ? { endsAt } : {}),
      ...(typeof beats === "string" && beats !== "" ? { beats } : {}),
    })
  }
  return found
}

function lastChapterOf(root: string, named: string): number {
  let last = 0
  for (const one of valuesOfType(root, storyChapterPlayed.slug)) {
    const position = one.value[POSITION]
    if (one.value[STORY] !== named || typeof position !== "number") continue
    last = Math.max(last, position)
  }
  return last
}

function proseAt(root: string, at: string): string | null {
  const beside = besideAt(at, PROSE, HELD)
  if (beside === null) return null
  const path = join(root, beside)
  if (statSync(path, { throwIfNoEntry: false }) === undefined) return null
  return readFileSync(path, UTF8)
}

function beatsAt(root: string, one: Turn): Beats | { readonly refused: string } {
  const value = one.beats === undefined ? {} : { [BEATS]: one.beats }
  return beatsHeld({ at: one.at, slug: one.slug, value }, (path) =>
    readFileSync(join(root, path), UTF8)
  )
}

async function closed(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing
): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  const slug = storyOf(held.story)
  const listed = listedAt(given.root, storyPlayed.slug, slug)[0]
  if (listed === undefined) return refused(`\`${held.story}\` names no played story here`, DATA)
  const named = `${storyPlayed.slug}/${slug}`
  const turns = openThrough(turnsOf(given.root, named), held.through)
  if (!turns.some((one) => one.position === held.through)) {
    return refused(`\`${slug}\` has no open turn numbered ${held.through}`, DATA)
  }
  const texts: string[] = []
  const turnBeats: Beats[] = []
  for (const one of turns) {
    const text = proseAt(given.root, one.at)
    if (text === null) return refused(`\`${one.at}\` has no prose file beside it`, DATA)
    texts.push(text)
    const read = beatsAt(given.root, one)
    if ("refused" in read) return refused(read.refused, DATA)
    turnBeats.push(read)
  }
  const beats = chapterBeatsOf(turnBeats)
  const position = lastChapterOf(given.root, named) + 1
  const chapterSlug = chapterSlugOf(slug, position, held.title)
  const prose = proseOf(texts)
  const turnCovers = turnCoversOf(anchoredOf(turns, texts))
  const folder = `${listed.path.slice(0, listed.path.lastIndexOf(PARTED))}${PARTED}${storyChapterPlayed.pluralSlug}`
  const naming: Naming = {
    pageTypeSlug: storyChapterPlayed.slug,
    slug: chapterSlug,
    path: `${folder}${PARTED}${chapterSlug}.${storyChapterPlayed.slug}.ts`,
    values: {
      title: held.title,
      story: named,
      position,
      ownLength: wordCount(prose),
      unit: WORDS,
      prose: HELD,
      ...(turnCovers.length === 0 ? {} : { turnCovers }),
      ...lastTurnOf(turns),
      ...endsAtOf(turns),
      ...(beats === null ? {} : { [BEATS]: BEATS_HELD }),
    },
    bodies: { prose, ...(beats === null ? {} : { [BEATS]: beats }) },
  }
  const folded = foldedFor(given.root, [naming])
  if ("refused" in folded) return refused(folded.refused, DATA)
  const landed = await landing(
    given.root,
    [...folded.puts.map(putting), ...turns.map((one) => taking(one.at))],
    `${held.title} closes as chapter ${position} of ${slug}, from its turns ${turns[0]?.position} through ${held.through}`,
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told([chapterSlug, ...turns.map((one) => `took\t${one.at}`)])
}

export async function storyChapterClose(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await closed(done, argv, given, landing))
}
