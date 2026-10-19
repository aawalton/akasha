export type Lecture = {
  readonly id: string
  readonly index: number
  readonly seconds: number
}

export type Course = {
  readonly next: number | null
  readonly lengthMinutes: number
  readonly progressMinutes: number
  readonly lectures: number
  readonly lecturesWatched: number
}

const SECONDS_IN_A_MINUTE = 60

const ROUNDING_MINUTES = 0.005

function minutesOf(seconds: number): number {
  return Math.round((seconds / SECONDS_IN_A_MINUTE) * 100) / 100
}

function inOrderOf(lectures: readonly Lecture[]): readonly Lecture[] {
  return [...lectures].sort((one, two) => one.index - two.index)
}

function watchedWithin(inOrder: readonly Lecture[], progressMinutes: number): number {
  let through = 0
  let watched = 0
  for (const lecture of inOrder) {
    const before = through
    through += lecture.seconds
    const covered =
      lecture.seconds > 0
        ? minutesOf(through) <= progressMinutes + ROUNDING_MINUTES
        : progressMinutes > minutesOf(before) + ROUNDING_MINUTES
    if (!covered) break
    watched += 1
  }
  return watched
}

export function lengthened(
  lectures: readonly Lecture[],
  index: number,
  seconds: number
): readonly Lecture[] {
  return lectures.map((one) =>
    one.index === index && one.seconds === 0 ? { ...one, seconds: Math.round(seconds) } : one
  )
}

function courseThrough(inOrder: readonly Lecture[], watched: number): Course {
  let length = 0
  let progress = 0
  for (const [at, lecture] of inOrder.entries()) {
    length += lecture.seconds
    if (at < watched) progress += lecture.seconds
  }
  return {
    next: inOrder[watched]?.index ?? null,
    lengthMinutes: minutesOf(length),
    progressMinutes: minutesOf(progress),
    lectures: inOrder.length,
    lecturesWatched: watched,
  }
}

export function placeOf(lectures: readonly Lecture[], progressMinutes: number): Course {
  const inOrder = inOrderOf(lectures)
  return courseThrough(inOrder, watchedWithin(inOrder, progressMinutes))
}

export function finishedThrough(
  lectures: readonly Lecture[],
  progressMinutes: number,
  index: number
): Course {
  const inOrder = inOrderOf(lectures)
  const finished = inOrder.findIndex((one) => one.index === index) + 1
  return courseThrough(inOrder, Math.max(watchedWithin(inOrder, progressMinutes), finished))
}
