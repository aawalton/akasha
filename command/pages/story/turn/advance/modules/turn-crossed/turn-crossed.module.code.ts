import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import {
  outcomesAt,
  turnsIndexed,
} from "akasha/command/pages/story/settle/story-settle.command.code.ts"
import type { Turn } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { bareOf } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const RANKED = ["level", "rank", "tier", "stage", "depth"] as const

const NAMED_BY = ["skill", "track", "ability"] as const

const CHECK = "check"

const READING = "reading"

const ANSWERED = "answered"

const CHARACTER = "character"

const KIND = "kind"

const FROM = "from"

const TO = "to"

const POSITION = "position"

const LINES = /\r?\n/

const UTF8 = "utf8"

type Said = string | number

export type Crossed = { readonly turn: string; readonly crossings: readonly string[] }

export type Crossing = (root: string, game: string, turn: Turn) => Crossed | null

function saidIn(value: unknown): value is Said {
  return typeof value === "string" || typeof value === "number"
}

function movedSaid(what: string, from: Said, to: Said): string {
  return `${what} from ${from} to ${to}`
}

function grownIn(value: unknown, found: string[]): undefined {
  if (Array.isArray(value)) {
    for (const one of value) grownIn(one, found)
    return undefined
  }
  if (!isRecord(value)) return undefined
  const kind = value[KIND]
  const from = value[FROM]
  const to = value[TO]
  if (typeof kind === "string" && saidIn(from) && saidIn(to) && from !== to) {
    const name = NAMED_BY.map((key) => value[key]).find((one) => typeof one === "string")
    found.push(movedSaid(name === undefined ? kind : `${kind} ${String(name)}`, from, to))
  }
  for (const one of Object.values(value)) grownIn(one, found)
  return undefined
}

function rankedIn(reading: unknown, answered: Record<string, unknown>): string[] {
  if (!isRecord(reading)) return []
  return RANKED.flatMap((key) => {
    const from = reading[key]
    const to = answered[key]
    return saidIn(from) && saidIn(to) && from !== to ? [movedSaid(key, from, to)] : []
  })
}

function lineCrossed(line: string): readonly string[] {
  const read: unknown = JSON.parse(line)
  if (!isRecord(read)) return []
  const check = read[CHECK]
  const reading = read[READING]
  const answered = read[ANSWERED]
  if (typeof check !== "string" || !isRecord(answered)) return []
  const found = rankedIn(reading, answered)
  grownIn(answered, found)
  const character = isRecord(reading) ? reading[CHARACTER] : undefined
  const whose = typeof character === "string" ? ` for \`${bareOf(character)}\`` : ""
  return found.map((one) => `- \`${bareOf(check)}\`${whose}: ${one}`)
}

export function crossingsIn(outcomes: string): readonly string[] {
  return outcomes
    .split(LINES)
    .filter((one) => one.trim() !== "")
    .flatMap(lineCrossed)
}

export function crossedSaid(crossed: Crossed | null): string {
  if (crossed === null || crossed.crossings.length === 0) return ""
  const opening = `The checks settled on \`${crossed.turn}\` crossed these; open a window for each its prose did not show:`
  return ["", "", opening, ...crossed.crossings].join("\n")
}

export function crossedIndexed(root: string, game: string, turn: Turn): Crossed | null {
  const position = turn.value[POSITION]
  if (typeof position !== "number") return null
  const before = turnsIndexed(root, game).find((one) => one.position === position - 1)
  if (before === undefined) return null
  const at = outcomesAt(before.at)
  if (at === null || !existsSync(join(root, at))) return null
  return { turn: before.slug, crossings: crossingsIn(readFileSync(join(root, at), UTF8)) }
}
