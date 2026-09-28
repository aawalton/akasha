import {
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
  const next = turnPathAfter(read.turn)
  return next !== null && statusByTurn.has(next)
}
