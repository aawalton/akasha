import { createHash } from "node:crypto"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"

const DIGEST = "sha256"

const HEX = "hex"

export type Bonus = {
  readonly from: string
  readonly by: number
}

export type MechanicRun = {
  readonly turn: number
  readonly mechanic: string
  readonly reading: unknown
  readonly answered: unknown
  readonly bonuses: readonly Bonus[]
  readonly seed: string | null
  readonly follows: string | null
  readonly said: string | null
}

function bonusesIn(held: unknown): readonly Bonus[] {
  if (!Array.isArray(held)) return []
  const found: Bonus[] = []
  for (const one of held) {
    if (!isRecord(one)) continue
    const from = one["from"]
    const by = one["by"]
    if (typeof from === "string" && typeof by === "number") found.push({ from, by })
  }
  return found
}

export function lineOf(run: MechanicRun): string {
  return JSON.stringify(run)
}

export function followingOn(line: string | null): string | null {
  return line === null ? null : createHash(DIGEST).update(line).digest(HEX)
}

export function runIn(line: string): MechanicRun | null {
  const held: unknown = JSON.parse(line)
  if (!isRecord(held)) return null
  const turn = held["turn"]
  const mechanic = held["mechanic"]
  if (typeof turn !== "number" || typeof mechanic !== "string") return null
  return {
    turn,
    mechanic,
    reading: held["reading"] ?? null,
    answered: held["answered"] ?? null,
    bonuses: bonusesIn(held["bonuses"]),
    seed: textIn(held["seed"]),
    follows: textIn(held["follows"]),
    said: textIn(held["said"]),
  }
}
