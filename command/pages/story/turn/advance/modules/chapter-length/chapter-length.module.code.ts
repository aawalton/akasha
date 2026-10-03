import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { prose as proseFile } from "akasha/story/world/stories/played/properties/prose.file-property.ts"
import {
  BEAT_EDITOR,
  type Handed,
  type Held,
  PROSE_EDITOR,
  type TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const CHAPTER_BREAK = "chapterBreak"

const EDITED = 2

const WHERE_EDITED = " where its story has editor steps"

const UNWORDED = /[^\p{L}\p{N}]+/gu

const FEWEST_BEATS = 50

const MOST_BEATS = 100

const FEWEST_WORDS = 50

const MOST_WORDS = 200

const SPACE = /\s+/

const BEFORE = "the chapter before sets no length"

export function wordsIn(prose: string): number {
  return prose.split(SPACE).filter((one) => one !== "").length
}

export type Editing = { readonly status: TurnStep; readonly words: number }

type Turn = { readonly at: string; readonly value: Readonly<Record<string, unknown>> }

function wordsHeld(turn: Turn, textOf: (path: string) => string): number {
  const ending = turn.value[proseFile.propertySlug]
  const at = typeof ending === "string" ? besideAt(turn.at, proseFile.propertySlug, ending) : null
  if (at === null) return 0
  try {
    return wordsIn(textOf(at))
  } catch {
    return 0
  }
}

export function editingOf(
  held: Held,
  turn: Turn,
  textOf: (path: string) => string
): Editing | null {
  if (held.editorSteps !== true) return null
  const words = held.status === PROSE_EDITOR ? wordsHeld(turn, textOf) : 0
  return { status: held.status, words }
}

function halfRefused(count: number, handed: number, what: string): string | null {
  const most = Math.floor(handed / 2)
  if (count <= most) return null
  return `${what} ${handed} to at most half, so at most ${most}, and this runs to ${count}`
}

function beatsRefused(count: number, held: number, editing: Editing | null): string | null {
  if (editing?.status === BEAT_EDITOR) {
    return halfRefused(count, held, "a beat editor cuts the beats it was handed from")
  }
  if (editing !== null && held > 0) {
    if (count <= MOST_BEATS) return null
    return `a written chapter's mended beats number at most ${MOST_BEATS}${WHERE_EDITED}, and these number ${count}`
  }
  const scale = editing === null ? 1 : EDITED
  const [fewest, most] = [FEWEST_BEATS * scale, MOST_BEATS * scale]
  if (count >= fewest && count <= most) return null
  const where = editing === null ? "" : WHERE_EDITED
  return `a written chapter's beats number ${fewest} to ${most}${where}, and these number ${count}; ${BEFORE}`
}

function proseRefused(words: number, beats: number, editing: Editing | null): string | null {
  if (editing?.status === PROSE_EDITOR) {
    return halfRefused(words, editing.words, "a prose editor cuts the writer's words from")
  }
  if (beats === 0) return null
  const scale = editing === null ? 1 : EDITED
  const [least, utmost] = [FEWEST_WORDS * scale, MOST_WORDS * scale]
  const [fewest, most] = [least * beats, utmost * beats]
  if (words >= fewest && words <= most) return null
  const where = editing === null ? "" : WHERE_EDITED
  return `a written chapter's prose runs ${least} to ${utmost} words for each of its beats${where}, so ${fewest} to ${most} words for its ${beats} beats, and this prose runs ${words} words; ${BEFORE}`
}

function wordedOf(text: string): string {
  return text.toLowerCase().replace(UNWORDED, " ").trim()
}

function breakRefused(beats: readonly string[], chapterBreak: string | null): string | null {
  const said = chapterBreak === null ? "" : wordedOf(chapterBreak)
  if (said === "") return null
  const at = beats.findIndex((one) => ` ${wordedOf(one)} `.includes(` ${said} `))
  if (at < 0) return null
  return `beat ${at + 1} restates the story's chapter break, and the break is where the beats stop, never a beat`
}

export function breakIndexed(root: string, game: string): string | null {
  const at = listedAt(root, storyWritten.slug, game)[0]?.path
  const said = at === undefined ? undefined : valueAt(at, root)?.[CHAPTER_BREAK]
  return typeof said === "string" ? said : null
}

export function lengthRefused(
  handed: Handed,
  beats: number,
  chapterBreak: string | null = null,
  editing: Editing | null = null
): string | null {
  if (handed.kind === "beats") {
    const sized = beatsRefused(handed.beats.length, beats, editing)
    return sized ?? breakRefused(handed.beats, chapterBreak)
  }
  if (handed.kind !== "prose") return null
  return proseRefused(wordsIn(handed.prose), beats, editing)
}
