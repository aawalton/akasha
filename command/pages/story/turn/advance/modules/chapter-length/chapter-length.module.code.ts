import type { Handed } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

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
  const fewest = FEWEST_WORDS * beats
  const most = MOST_WORDS * beats
  if (words >= fewest && words <= most) return null
  return `a written chapter's prose runs ${FEWEST_WORDS} to ${MOST_WORDS} words for each of its beats, so ${fewest} to ${most} words for its ${beats} beats, and this prose runs ${words} words; ${BEFORE}`
}

export function lengthRefused(handed: Handed, beats: number): string | null {
  if (handed.kind === "beats") return beatsRefused(handed.beats.length)
  if (handed.kind !== "prose") return null
  return proseRefused(wordsIn(handed.prose), beats)
}
