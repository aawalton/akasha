import {
  PLAYER,
  slugAfter,
  stepIn,
  type TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const NOTICE_OPENING = /^The (?:turn|chapter) `([^`]+)` is at ([a-z-]+)\./

const PARTED = "/"

const NAME_PARTED = "."

export function noticeRead(
  body: string
): { readonly turn: string; readonly step: TurnStep } | null {
  const found = NOTICE_OPENING.exec(body)
  const turn = found?.[1]
  const step = stepIn(found?.[2])
  return turn === undefined || step === null ? null : { turn, step }
}

export function turnPathAfter(turn: string): string | null {
  const at = turn.lastIndexOf(PARTED) + 1
  const name = turn.slice(at)
  const parted = name.indexOf(NAME_PARTED)
  if (parted <= 0) return null
  const next = slugAfter(name.slice(0, parted))
  return next === null ? null : `${turn.slice(0, at)}${next}${name.slice(parted)}`
}

export function noticeStale(body: string, statusByTurn: ReadonlyMap<string, unknown>): boolean {
  const read = noticeRead(body)
  if (read === null || !statusByTurn.has(read.turn)) return false
  if (stepIn(statusByTurn.get(read.turn)) !== read.step) return true
  if (read.step !== PLAYER) return false
  const next = turnPathAfter(read.turn)
  return next !== null && statusByTurn.has(next)
}

export const STALE = "stale"

const CURRENT = "current"

type Asked = { readonly body: string; readonly statuses: readonly (readonly [string, unknown])[] }

function askedIn(text: string): Asked | null {
  try {
    const held: unknown = JSON.parse(text)
    if (held === null || typeof held !== "object") return null
    const body = (held as Record<string, unknown>)["body"]
    const statuses = (held as Record<string, unknown>)["statuses"]
    if (typeof body !== "string" || !Array.isArray(statuses)) return null
    const pairs = statuses.filter(
      (one): one is [string, unknown] => Array.isArray(one) && typeof one[0] === "string"
    )
    return { body, statuses: pairs }
  } catch {
    return null
  }
}

function judgedText(text: string): string | null {
  const asked = askedIn(text)
  if (asked === null) return null
  return noticeStale(asked.body, new Map(asked.statuses)) ? STALE : CURRENT
}

export async function ran(): Promise<number> {
  const said = judgedText(await Bun.stdin.text())
  if (said === null) return 1
  process.stdout.write(said)
  return 0
}

if (import.meta.main) process.exit(await ran())
