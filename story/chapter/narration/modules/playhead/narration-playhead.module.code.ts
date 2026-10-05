export type ChapterPlaced = {
  readonly id: string
  readonly title: string
  readonly startSeconds: number
  readonly durationSeconds: number | null
}

export type PlayheadActs = {
  readonly askNextAfter: string | null
  readonly read: readonly string[]
}

function placedOne(said: unknown): ChapterPlaced | null {
  if (said === null || typeof said !== "object") return null
  const held = said as Record<string, unknown>
  const { id, title, startSeconds, durationSeconds } = held
  if (typeof id !== "string" || typeof startSeconds !== "number") return null
  return {
    id,
    title: typeof title === "string" ? title : "",
    startSeconds,
    durationSeconds: typeof durationSeconds === "number" ? durationSeconds : null,
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

export function chapterEnded(one: ChapterPlaced, seconds: number): boolean {
  return one.durationSeconds !== null && one.startSeconds + one.durationSeconds <= seconds
}

export function actsAt(args: {
  readonly placed: readonly ChapterPlaced[]
  readonly seconds: number
  readonly asked: ReadonlySet<string>
  readonly read: ReadonlySet<string>
  readonly ended: boolean
}): PlayheadActs {
  const { placed, seconds, asked, read, ended } = args
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
  const done = placed
    .filter((one) => !read.has(one.id) && chapterEnded(one, seconds))
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
