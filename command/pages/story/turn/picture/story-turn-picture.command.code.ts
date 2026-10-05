import { withProperty } from "akasha/change/modules/literal-splicing/literal-splicing.module.code.ts"
import {
  assignedIn,
  literalIn,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import {
  type Asking,
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { formattedBody } from "akasha/code/running/modules/code-format/code-format.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { picturedFile } from "akasha/command/argument/pages/pictured-file.argument.ts"
import { writtenChapter } from "akasha/command/argument/pages/written-chapter.argument.ts"
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
import { heldAt } from "akasha/command/modules/filling/command-filling.module.code.ts"
import {
  replacing,
  spliced,
} from "akasha/command/pages/story/modules/tell-continuing/tell-continuing.module.code.ts"
import { REACHED } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { storyTurnPicture as page } from "akasha/command/pages/story/turn/picture/story-turn-picture.command.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type Pictured,
  picturedIn,
} from "akasha/story/engine/beat-state/modules/beat-pictures/beat-pictures.module.code.ts"
import {
  beatsIn,
  beatsWritten,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import {
  linesIn,
  picturedMerged,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const NAMED = [writtenChapter, picturedFile] as const

const SCENES = "scenes"

const BEATS = "beats"

const STORY = "story"

const AFTER = "cover"

const PAGE_ENDS = /\.ts$/

const SWITCH = "picturesOnBeats"

type Taken = { readonly chapter: string; readonly file: string }

export function taken(argv: readonly string[], calledAs: string): Taken | { refused: string } {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const chapter = read.taken.writtenChapter.trim()
  const file = read.taken.picturedFile.trim()
  if (chapter === "") return { refused: `\`${writtenChapter.said}\` names no chapter` }
  return { chapter, file }
}

export type Chapter = {
  readonly at: string
  readonly text: string
  readonly value: Value
  readonly beatsAt: string
  readonly beatsText: string
  readonly storyValue: Value | null
}

function scenesOf(pictured: readonly Pictured[]): readonly string[] {
  return [...new Set(pictured.map((one) => one.cover))]
}

export function chapterScened(at: string, text: string, scenes: readonly string[]): string | null {
  const source = parsedAs(at, text)
  const owner = literalIn(source)
  if (owner === null) return null
  const put = `${SCENES}: ${JSON.stringify(scenes)}`
  const held = assignedIn(owner, SCENES)
  if (held === null) return spliced(text, [withProperty(text, source, owner, put, AFTER)])
  return spliced(text, [{ from: held.getStart(source), to: held.getEnd(), put }])
}

type Pictures = {
  readonly beats: string
  readonly scenes: readonly string[]
  readonly count: number
}

export function picturesLaid(chapter: Chapter, lines: readonly string[]): Pictures | string {
  if (chapter.storyValue?.[SWITCH] !== true) {
    return `the story of this chapter states no \`${SWITCH}\`, so its pictures land with the recorder's advance`
  }
  const read = beatsIn(chapter.beatsText)
  if ("refused" in read) return `the chapter's beats will not read: ${read.refused}`
  const handed = picturedIn(lines, read.beats.length)
  if ("refused" in handed) return handed.refused
  if (handed.length === 0) return `\`${picturedFile.said}\` holds no picture`
  const pictured = picturedMerged(read.pictured ?? [], handed)
  return {
    beats: beatsWritten({ ...read, pictured }),
    scenes: scenesOf(pictured),
    count: handed.length,
  }
}

function chapterRead(root: string, slug: string): Chapter | string {
  const reached = REACHED.chapterAt?.(root, slug) ?? null
  if (reached === null) return `\`${slug}\` names no written chapter here`
  const ending = textAt(reached.value, BEATS)
  if (ending === null) return `\`${slug}\` keeps no beats file`
  const beatsAt = reached.at.replace(PAGE_ENDS, `.${BEATS}.${ending}`)
  const story = addressIn(textAt(reached.value, STORY) ?? "")
  const storyAt =
    story.kind === "qualified" ? listedAt(root, story.pageTypeSlug, story.slug)[0]?.path : undefined
  return {
    at: reached.at,
    text: REACHED.textIn(root, reached.at),
    value: reached.value,
    beatsAt,
    beatsText: REACHED.textIn(root, beatsAt),
    storyValue: storyAt === undefined ? null : valueAt(storyAt, root),
  }
}

function shaped(root: string, path: string, text: string): string {
  return new TextDecoder().decode(formattedBody(root, path, new TextEncoder().encode(text)).body)
}

function askedFor(root: string, chapter: Chapter, laid: Pictures): readonly Asking[] | string {
  const scened = chapterScened(chapter.at, chapter.text, laid.scenes)
  if (scened === null) return `\`${chapter.at}\` exports no object`
  const asked: Asking[] = []
  if (laid.beats !== chapter.beatsText)
    asked.push(replacing(chapter.beatsAt, chapter.beatsText, laid.beats))
  const now = shaped(root, chapter.at, scened)
  if (now !== chapter.text) asked.push(replacing(chapter.at, chapter.text, now))
  return asked
}

async function picturedBy(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing
): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  const file = heldAt(given.root, picturedFile.said, held.file)
  if ("refused" in file) return refusedBy(file.refused, INPUT)
  return await REACHED.hold(given.root, held.chapter, async () => {
    const chapter = chapterRead(given.root, held.chapter)
    if (typeof chapter === "string") return refused(chapter, DATA)
    const laid = picturesLaid(chapter, linesIn(file.text))
    if (typeof laid === "string") return refused(laid, DATA)
    const asked = askedFor(given.root, chapter, laid)
    if (typeof asked === "string") return refused(asked, DATA)
    if (asked.length === 0) return told([`pictured\t${held.chapter}\t0 new`])
    const landed = await landing(
      given.root,
      asked,
      `${held.chapter} pictures ${laid.count} beat(s) as they are made`,
      { agentId: given.agentId, writer: given.writer, done }
    )
    if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
    return told([`pictured\t${held.chapter}\t${laid.count}`, `scenes\t${laid.scenes.length}`])
  })
}

export async function storyTurnPicture(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await picturedBy(done, argv, given, landing))
}
