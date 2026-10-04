import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Handed } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const CHAPTER_BREAK = "chapterBreak"

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

function beatsRefused(count: number): string | null {
  if (count >= FEWEST_BEATS && count <= MOST_BEATS) return null
  return `a written chapter's beats number ${FEWEST_BEATS} to ${MOST_BEATS}, and these number ${count}; ${BEFORE}`
}

function proseRefused(words: number, beats: number): string | null {
  if (beats === 0) return null
  const [fewest, most] = [FEWEST_WORDS * beats, MOST_WORDS * beats]
  if (words >= fewest && words <= most) return null
  return `a written chapter's prose runs ${FEWEST_WORDS} to ${MOST_WORDS} words for each of its beats, so ${fewest} to ${most} words for its ${beats} beats, and this prose runs ${words} words; ${BEFORE}`
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
  chapterBreak: string | null = null
): string | null {
  if (handed.kind === "beats") {
    return beatsRefused(handed.beats.length) ?? breakRefused(handed.beats, chapterBreak)
  }
  if (handed.kind !== "prose") return null
  return proseRefused(wordsIn(handed.prose), beats)
}
