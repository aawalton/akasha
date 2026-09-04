import { MESSAGE, MESSAGE_FILE } from "../../../../commands/write/write.command.code.ts"
import { BREAK_GLASS, DRY_RUN } from "../../../asking/asking.module.code.ts"
import type { Pair } from "../spreading/move-spreading.module.code.ts"

export const FROM = "--from"

export const TO = "--to"

export const VALUED = [FROM, TO, MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const BARE = [DRY_RUN]

export type Read =
  | { readonly pairs: readonly Pair[]; readonly dryRun: boolean }
  | { readonly refused: string }

export function pairsIn(argv: readonly string[]): Read {
  const pairs: Pair[] = []
  let pending: string | null = null
  let dryRun = false
  let at = 0
  while (at < argv.length) {
    const token = argv[at]
    if (token === undefined) break
    if (BARE.includes(token)) {
      dryRun = true
      at = at + 1
      continue
    }
    if (!VALUED.includes(token)) {
      return {
        refused: `\`${token}\` is not a flag this takes — a move names its sides as \`${FROM} <path> ${TO} <path>\``,
      }
    }
    const value = argv[at + 1]
    const carries = token === MESSAGE || token === MESSAGE_FILE || token === BREAK_GLASS
    if (value === undefined || (value.startsWith("-") && !carries)) {
      return { refused: `${token} needs a value, and the line ends or names another flag` }
    }
    at = at + 2
    if (carries) continue
    if (token === FROM) {
      if (pending !== null) {
        return { refused: `${FROM} ${pending} has no ${TO} — each pair names both sides` }
      }
      pending = value
      continue
    }
    if (pending === null) {
      return { refused: `${TO} ${value} has no ${FROM} — each pair names both sides` }
    }
    pairs.push({ from: pending, to: value })
    pending = null
  }
  if (pending !== null) {
    return { refused: `${FROM} ${pending} has no ${TO} — each pair names both sides` }
  }
  return { pairs, dryRun }
}
