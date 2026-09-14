import { sayingWith } from "akasha/agents/seats/supervisors/supervisor-log/modules/supervisor-saying/supervisor-saying.module.code.ts"
import { LOG } from "akasha/agents/seats/supervisors/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import {
  midRefresh,
  REFRESH_WAITED_AT_MOST_MS,
} from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"
import { asking } from "akasha/pages/service/modules/page-asking/page-asking.module.code.ts"

const NONE = "none"

const PAGE_TYPE = "seat-conditions"

const KEYS = [
  "model",
  "subagentModel",
  "fallbackModel",
  "autoCompactWindow",
  "effortLevel",
  "subagentSpawnDepth",
  "toolTimeout",
  "resumeThresholdMinutes",
  "resumeTokenThreshold",
  "extendedContextAvailable",
] as const

type Held = Readonly<Record<string, unknown>>

export interface SeatConditions {
  readonly model: string | null
  readonly subagentModel: string | null
  readonly fallbackModel: string | null
  readonly autoCompactWindow: string | null
  readonly effortLevel: string | null
  readonly subagentSpawnDepth: string | null
  readonly toolTimeout: string | null
  readonly resumeThresholdMinutes: string | null
  readonly resumeTokenThreshold: string | null
  readonly extendedContextAvailable: boolean
}

function stated(values: Held, key: string): string | null {
  const held = values[key]
  if (typeof held === "number") return String(held)
  if (typeof held !== "string") return null
  const text = held.trim()
  if (text === "" || text === NONE) return null
  return text
}

function flagged(values: Held, key: string): boolean {
  const held = values[key]
  return held === true || held === "true"
}

function checkoutRoot(): string {
  const root = rootFor(resolveRoots(), AKASHA)
  if (root === "") {
    throw new Error("no akasha checkout stands here, so nothing states what a seat runs under")
  }
  return root
}

function readSeatConditions(): SeatConditions {
  const asked = asking(checkoutRoot(), { pageTypeSlug: PAGE_TYPE, keys: [...KEYS] } as never) as {
    readonly refused?: string
    readonly rows?: readonly Held[]
  }
  if (asked.refused !== undefined) {
    throw new Error(`\`${PAGE_TYPE}\` could not be read — ${asked.refused}`)
  }
  const rows = asked.rows ?? []
  const [row, second] = rows
  if (row === undefined) {
    throw new Error(`no \`${PAGE_TYPE}\` page stands, so nothing states what a seat runs under`)
  }
  if (second !== undefined) {
    throw new Error(
      `${rows.length} \`${PAGE_TYPE}\` pages stand where one carries them, so none of them holds`
    )
  }
  return {
    model: stated(row, "model"),
    subagentModel: stated(row, "subagentModel"),
    fallbackModel: stated(row, "fallbackModel"),
    autoCompactWindow: stated(row, "autoCompactWindow"),
    effortLevel: stated(row, "effortLevel"),
    subagentSpawnDepth: stated(row, "subagentSpawnDepth"),
    toolTimeout: stated(row, "toolTimeout"),
    resumeThresholdMinutes: stated(row, "resumeThresholdMinutes"),
    resumeTokenThreshold: stated(row, "resumeTokenThreshold"),
    extendedContextAvailable: flagged(row, "extendedContextAvailable"),
  }
}

const ASKING_AGAIN_MS = 1_000

const REFRESHING = "the index is part way through a refresh, so the seat conditions are read again"

export type SeatConditionsSaying = (text: string) => undefined

export type SeatConditionsWait = {
  readonly askingAgainMs?: number
  readonly waitingAtMostMs?: number
  readonly now?: () => number
  readonly say?: SeatConditionsSaying
}

function waited(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function seatConditionsPastRefresh(
  read: () => SeatConditions = readSeatConditions,
  wait: SeatConditionsWait = {}
): Promise<SeatConditions> {
  const askingAgainMs = wait.askingAgainMs ?? ASKING_AGAIN_MS
  const waitingAtMostMs = wait.waitingAtMostMs ?? REFRESH_WAITED_AT_MOST_MS
  const now = wait.now ?? Date.now
  const say = wait.say ?? sayingWith(LOG)
  const waitedSeconds = Math.round(waitingAtMostMs / 1_000)
  let waitingSince: number | null = null
  while (true) {
    try {
      return read()
    } catch (err) {
      if (!midRefresh(err)) throw err
      if (waitingSince === null) {
        waitingSince = now()
        say(REFRESHING)
      } else if (now() - waitingSince >= waitingAtMostMs) {
        const gaveUp =
          `the index stayed part way through a refresh for ${waitedSeconds}s, so what a seat ` +
          "runs under went unread"
        say(gaveUp)
        throw new Error(gaveUp)
      }
    }
    await waited(askingAgainMs)
  }
}
