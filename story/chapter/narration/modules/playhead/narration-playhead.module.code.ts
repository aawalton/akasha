type Mark = readonly [seconds: number, wordStart: number]

export type ChapterPlaced = {
  readonly id: string
  readonly title: string
  readonly startSeconds: number
  readonly durationSeconds: number | null
  readonly marks: readonly Mark[]
}

type PlayheadActs = {
  readonly askNextAfter: string | null
  readonly read: readonly string[]
}

type ProgressMade = { readonly id: string; readonly ownProgress: number }

function markOf(said: unknown): Mark | null {
  if (!Array.isArray(said)) return null
  const [seconds, wordStart] = said as unknown[]
  return typeof seconds === "number" && typeof wordStart === "number" ? [seconds, wordStart] : null
}

function marksOf(said: unknown): readonly Mark[] {
  if (!Array.isArray(said)) return []
  return said.map(markOf).filter((one): one is Mark => one !== null)
}

function placedOne(said: unknown): ChapterPlaced | null {
  if (said === null || typeof said !== "object") return null
  const held = said as Record<string, unknown>
  const { id, title, startSeconds, durationSeconds, marks } = held
  if (typeof id !== "string" || typeof startSeconds !== "number") return null
  return {
    id,
    title: typeof title === "string" ? title : "",
    startSeconds,
    durationSeconds: typeof durationSeconds === "number" ? durationSeconds : null,
    marks: marksOf(marks),
  }
}

export function placedOf(said: unknown): readonly ChapterPlaced[] {
  if (!Array.isArray(said)) return []
  return said.map(placedOne).filter((one): one is ChapterPlaced => one !== null)
}

export function chapterAt(placed: readonly ChapterPlaced[], seconds: number): ChapterPlaced | null {
  let found: ChapterPlaced | null = null
  for (const one of placed) if (one.startSeconds <= seconds) found = one
  return found
}

export function progressAt(args: {
  readonly placed: readonly ChapterPlaced[]
  readonly seconds: number
  readonly written: ReadonlyMap<string, number>
  readonly lengthOf: (id: string) => number | null
}): ProgressMade | null {
  const { placed, seconds, written, lengthOf } = args
  const playing = chapterAt(placed, seconds)
  if (playing === null) return null
  let word: number | null = null
  for (const [at, wordStart] of playing.marks) if (at <= seconds) word = wordStart
  if (word === null) return null
  const length = lengthOf(playing.id)
  const held = length === null ? word : Math.min(word, length - 1)
  return held > (written.get(playing.id) ?? 0) ? { id: playing.id, ownProgress: held } : null
}

export type Spoken = { readonly pageId: string; readonly from: number; readonly to: number | null }

export function sameSpoken(one: Spoken | null, other: Spoken | null): boolean {
  if (one === null || other === null) return one === other
  return one.pageId === other.pageId && one.from === other.from && one.to === other.to
}

export function spokenAt(placed: readonly ChapterPlaced[], seconds: number): Spoken | null {
  const playing = chapterAt(placed, seconds)
  if (playing === null) return null
  let from: number | null = null
  let to: number | null = null
  for (const [at, wordStart] of playing.marks) {
    if (at <= seconds) {
      from = wordStart
      to = null
    } else if (from !== null && to === null && wordStart > from) {
      to = wordStart
    }
  }
  return from === null ? null : { pageId: playing.id, from, to }
}

function playedThrough(one: ChapterPlaced, before: number, seconds: number): boolean {
  if (one.durationSeconds === null) return false
  const end = one.startSeconds + one.durationSeconds
  return before >= one.startSeconds && before < end && seconds >= end
}

export function actsAt(args: {
  readonly placed: readonly ChapterPlaced[]
  readonly before: number
  readonly seconds: number
  readonly leapt: boolean
  readonly asked: ReadonlySet<string>
  readonly read: ReadonlySet<string>
  readonly ended: boolean
}): PlayheadActs {
  const { placed, before, seconds, leapt, asked, read, ended } = args
  const playing = chapterAt(placed, seconds)
  const last = placed.at(-1)
  const askNextAfter =
    !ended &&
    playing !== null &&
    last !== undefined &&
    playing.id === last.id &&
    !asked.has(last.id)
      ? last.id
      : null
  const done = leapt
    ? []
    : placed
        .filter((one) => !read.has(one.id) && playedThrough(one, before, seconds))
        .map((one) => one.id)
  return { askNextAfter, read: done }
}

export function chapterStarts(
  placed: readonly ChapterPlaced[],
  seconds: number,
  step: -1 | 1
): number | null {
  const playing = chapterAt(placed, seconds)
  if (playing === null) return null
  const at = placed.indexOf(playing)
  if (step === -1) {
    const into = seconds - playing.startSeconds
    const previous = placed[at - 1]
    if (into > 3 || previous === undefined) return playing.startSeconds
    return previous.startSeconds
  }
  return placed[at + 1]?.startSeconds ?? null
}
