export type Lecture = {
  readonly id: string
  readonly index: number
  readonly seconds: number
  readonly watchedAt: number
}

export type Played = Readonly<Record<string, number>>

export type Course = {
  readonly next: number | null
  readonly lengthMinutes: number
  readonly progressMinutes: number
}

const NEAR_THE_END = 10

const SECONDS_IN_A_MINUTE = 60

function minutesOf(seconds: number): number {
  return Math.round((seconds / SECONDS_IN_A_MINUTE) * 100) / 100
}

export function watched(lecture: Lecture, played: number): boolean {
  if (played >= lecture.seconds * lecture.watchedAt) return true
  return lecture.seconds - played <= NEAR_THE_END
}

export function courseOf(lectures: readonly Lecture[], played: Played): Course {
  const inOrder = [...lectures].sort((one, two) => one.index - two.index)
  let next: number | null = null
  let length = 0
  let progress = 0
  for (const lecture of inOrder) {
    const held = played[lecture.id] ?? 0
    const done = watched(lecture, held)
    length += lecture.seconds
    progress += done ? lecture.seconds : Math.min(held, lecture.seconds)
    if (!done && next === null) next = lecture.index
  }
  return { next, lengthMinutes: minutesOf(length), progressMinutes: minutesOf(progress) }
}
