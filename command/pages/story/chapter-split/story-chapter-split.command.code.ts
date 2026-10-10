import { existsSync } from "node:fs"
import { join } from "node:path"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { readChapter } from "akasha/command/argument/pages/read-chapter.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import { refusalsIn } from "akasha/command/modules/applying/applying.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { storyChapterSplit as page } from "akasha/command/pages/story/chapter-split/story-chapter-split.command.ts"
import { rejoined } from "akasha/command/pages/story/modules/beat-rejoining/beat-rejoining.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { filing } from "akasha/page/service/modules/file-answering/file-answering.module.code.ts"
import { composedFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  type Beats,
  beatsWritten,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { CHAPTER_PAGE_TYPE } from "akasha/story/world/stories/read/wandering-inn/modules/chapter/chapter.module.code.ts"

const NAMED = [readChapter] as const

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const BEAT_WORDS = 500

export const EVENT_CEILING = 160

const MARKS_LEAST = 2

const PROSE = "prose"

const BEATS = "beats"

const JSONL = "jsonl"

const ELLIPSIS = "…"

const KEPT_LINE_ENDS = /(?<=\n)/

const LINE_ENDS = /\r?\n/

const SPACES = /\s+/g

const MARK_LINE = /^[—–\-*~=#_•· ]+$/u

const MARK_SPACES = / /g

const SENTENCE = /^.+?[.!?…]["'”’)\]]*(?=\s|$)/u

const DECODER = new TextDecoder()

type Kind = "blank" | "mark" | "text"

type Paragraph = {
  readonly start: number
  readonly words: number
  readonly afterBreak: boolean
}

type Refusal = { readonly refused: string }

export function kindOf(line: string): Kind {
  const held = line.trim()
  if (held === "") return "blank"
  const marks = held.replace(MARK_SPACES, "").length
  return MARK_LINE.test(held) && marks >= MARKS_LEAST ? "mark" : "text"
}

function wordsIn(line: string): number {
  return line.split(SPACES).filter((one) => one !== "").length
}

export function paragraphsIn(text: string): readonly Paragraph[] {
  const found: Paragraph[] = []
  let at = 0
  let broken = false
  for (const line of text.split(KEPT_LINE_ENDS)) {
    const kind = kindOf(line)
    if (kind === "mark") broken = true
    if (kind === "text") {
      found.push({ start: found.length === 0 ? 0 : at, words: wordsIn(line), afterBreak: broken })
      broken = false
    }
    at += line.length
  }
  return found
}

export function cutsIn(paragraphs: readonly Paragraph[], most: number): readonly number[] {
  const cuts: number[] = []
  let held = 0
  for (const one of paragraphs) {
    const opens = cuts.length === 0 || one.afterBreak || held + one.words > most
    if (opens) {
      cuts.push(one.start)
      held = 0
    }
    held += one.words
  }
  return cuts
}

export function eventOf(prose: string): string {
  const line = prose.split(LINE_ENDS).find((one) => kindOf(one) === "text") ?? prose
  const first = line.replace(SPACES, " ").trim()
  const sentence = SENTENCE.exec(first)?.[0] ?? first
  if (sentence.length <= EVENT_CEILING) return sentence
  const cut = sentence.slice(0, EVENT_CEILING)
  const space = cut.lastIndexOf(" ")
  return `${space > 0 ? cut.slice(0, space) : cut}${ELLIPSIS}`
}

export function beatsOf(text: string, most: number = BEAT_WORDS): Beats | null {
  const paragraphs = paragraphsIn(text)
  if (paragraphs.length === 0) return null
  const cuts = cutsIn(paragraphs, most)
  const prose = cuts.map((from, at) => ({
    beat: at + 1,
    prose: text.slice(from, cuts[at + 1] ?? text.length),
  }))
  const beats = prose.map((one) => eventOf(one.prose))
  return { beats, scenes: [], changes: [], memory: [], prose }
}

type Split = {
  readonly beats: number
  readonly path: string
  readonly commit: string | null
}

function chapterAt(root: string, slug: string): string | Refusal {
  const listed = listedAt(root, CHAPTER_PAGE_TYPE, slug)
  const at = listed.length === 1 ? listed[0]?.path : undefined
  if (at === undefined) return { refused: `\`${slug}\` names ${listed.length} read chapters here` }
  if (valueAt(at, root)?.[BEATS] !== undefined) {
    return { refused: `\`${slug}\` keeps beats already, and a split writes over none` }
  }
  return at
}

type Parted = { readonly beats: Beats; readonly written: string }

function proseOf(root: string, slug: string): Parted | Refusal {
  const read = filing(root, { pageTypeSlug: CHAPTER_PAGE_TYPE, slug, key: PROSE })
  if ("refused" in read) return { refused: `\`${slug}\` has no prose to split: ${read.refused}` }
  const text = DECODER.decode(read.bytes)
  const beats = beatsOf(text)
  if (beats === null) return { refused: `\`${slug}\`'s prose holds no paragraph to split` }
  const written = beatsWritten(beats)
  if (rejoined(written) !== text) {
    return { refused: `\`${slug}\`'s beats would not rejoin to its prose, so nothing is landed` }
  }
  return { beats, written }
}

async function splitOver(
  root: string,
  slug: string,
  landing: Landing,
  done: string[]
): Promise<Split | Refusal> {
  const at = chapterAt(root, slug)
  if (typeof at !== "string") return at
  const parted = proseOf(root, slug)
  if ("refused" in parted) return parted
  const { beats, written } = parted
  const composed = composedFor(root, {
    pageTypeSlug: CHAPTER_PAGE_TYPE,
    slug,
    values: { [BEATS]: JSONL },
    merge: true,
    bodies: { [BEATS]: written },
  })
  if ("refused" in composed) return { refused: `nothing was composed: ${composed.refused}` }
  const kept = composed.parts.find((one) => existsSync(join(root, one.path)))
  if (kept !== undefined)
    return { refused: `\`${kept.path}\` is there already, and a split writes over none` }
  const puts = [composed.put, ...composed.parts]
  const message = `split ${slug} into ${beats.beats.length} beats`
  const answer = await landing(
    root,
    puts.map((one) => ({ at: PUT, given: { at: one.path, body: one.content } }) as const),
    message,
    { done }
  )
  const wrong = refusalsIn(answer)
  if (wrong.length > 0) return { refused: `${message} did not land: ${wrong.join("; ")}` }
  const commit = "commit" in answer ? answer.commit : null
  return { beats: beats.beats.length, path: at, commit }
}

async function split(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refused(read.refused.join(" "), INPUT)
  const slug = read.taken.readChapter.trim()
  if (slug === "") return refused(`\`${readChapter.said}\` names no chapter`, INPUT)
  const said = await splitOver(given.root, slug, landing, done)
  if ("refused" in said) return refused(said.refused, DATA)
  return told([
    `beats\t${said.beats}`,
    `page\t${said.path}`,
    said.commit === null ? "unchanged\ttrue" : `commit\t${said.commit}`,
  ])
}

export async function storyChapterSplit(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await split(done, argv, given, landing))
}
