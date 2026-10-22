import { WORKED_AT } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-beating/service-beating.module.code.ts"
import {
  dropUncommitted,
  mergeUncommitted,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"

export const TROUBLES = "troubles"
export const WINDOW_MS = 10 * 60_000
export const SLOW_ANSWER_MS = 5_000
export const SLOW_ANSWERS = 10
export const LONG_ANSWER_MS = 60_000
export const LONG_HOLD_MS = 10_000
export const HEAVY_MB = 8_192
export const SAID_EVERY_MS = 60_000
const A_SECOND = 1_000

type Seen = {
  readonly at: number
  readonly ms: number
}

export type Troubling = {
  readonly answered: (at: number, ms: number) => undefined
  readonly held: (at: number, ms: number) => undefined
  readonly troubles: (at: number, heldMb: number) => readonly string[]
}

function seconds(ms: number): number {
  return Math.round(ms / A_SECOND)
}

function longestIn(seen: readonly Seen[]): number {
  return seen.reduce((most, one) => Math.max(most, one.ms), 0)
}

export function troublesIn(
  answers: readonly Seen[],
  holds: readonly Seen[],
  heldMb: number
): readonly string[] {
  const said: string[] = []
  if (answers.length >= SLOW_ANSWERS) {
    said.push(
      `answered ${answers.length} requests in ${seconds(SLOW_ANSWER_MS)} s or more in the last ten minutes`
    )
  }
  const longest = longestIn(answers)
  if (longest >= LONG_ANSWER_MS) {
    said.push(`took ${seconds(longest)} s over one answer in the last ten minutes`)
  }
  if (holds.length > 0) {
    said.push(`held its listening thread ${seconds(longestIn(holds))} s in the last ten minutes`)
  }
  if (heldMb >= HEAVY_MB) said.push(`holds ${Math.round(heldMb)} MB of memory`)
  return said
}

function recent(seen: readonly Seen[], at: number): Seen[] {
  return seen.filter((one) => at - one.at < WINDOW_MS)
}

export function troublingFor(): Troubling {
  let answers: Seen[] = []
  let holds: Seen[] = []
  return {
    answered: (at, ms) => {
      if (ms >= SLOW_ANSWER_MS) answers.push({ at, ms })
      return undefined
    },
    held: (at, ms) => {
      if (ms >= LONG_HOLD_MS) holds.push({ at, ms })
      return undefined
    },
    troubles: (at, heldMb) => {
      answers = recent(answers, at)
      holds = recent(holds, at)
      return troublesIn(answers, holds, heldMb)
    },
  }
}

export function keepingTroubles(
  root: string,
  page: string,
  troubles: readonly string[],
  at: Date
): undefined {
  const beat = { [WORKED_AT]: at.toISOString() }
  if (troubles.length > 0) {
    mergeUncommitted(root, page, { ...beat, [TROUBLES]: [...troubles] })
    return undefined
  }
  mergeUncommitted(root, page, beat)
  dropUncommitted(root, page, [TROUBLES])
  return undefined
}
