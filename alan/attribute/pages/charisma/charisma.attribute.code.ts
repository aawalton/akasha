import type { Row } from "akasha/alan/harness/readout/modules/asking/readout-asking.module.code.ts"
import { statedAt } from "akasha/alan/harness/readout/modules/tier/readout-tier.computed-property-module.code.ts"

const SAFETY_LEVEL = "safety-level"

const DIFFICULTY_LEVEL = "difficulty-level"

const STARTED_AT = "started-at"

const ENDED_AT = "ended-at"

const RELATIONSHIPS = "relationships"

const MILLISECONDS_TO_THE_HOUR = 3600000

export const AT_EASE = 1

export function easeIn(values: Readonly<Record<string, unknown>>): number | null {
  const safe = statedAt(values[SAFETY_LEVEL])
  const hard = statedAt(values[DIFFICULTY_LEVEL])
  if (safe === null || hard === null) return null
  return safe - hard
}

export function namesAnyone(values: Readonly<Record<string, unknown>>): boolean {
  const held = values[RELATIONSHIPS]
  return Array.isArray(held) && held.some((one) => typeof one === "string" && one.trim() !== "")
}

export function namesRelationship(
  values: Readonly<Record<string, unknown>>,
  relationship: string
): boolean {
  const held = values[RELATIONSHIPS]
  return Array.isArray(held) && held.includes(relationship)
}

export function hoursIn(values: Readonly<Record<string, unknown>>): number | null {
  const from = Date.parse(String(values[STARTED_AT] ?? ""))
  const to = Date.parse(String(values[ENDED_AT] ?? ""))
  if (!Number.isFinite(from) || !Number.isFinite(to)) return null
  return (to - from) / MILLISECONDS_TO_THE_HOUR
}

type With = (values: Readonly<Record<string, unknown>>) => boolean

function hoursAtEaseIn(rows: readonly Row[], isWith: With): number | null {
  let held: number | null = null
  for (const row of rows) {
    const ease = easeIn(row.values)
    if (ease === null) continue
    const hours = hoursIn(row.values)
    if (hours === null) continue
    const earns = ease >= AT_EASE && isWith(row.values)
    held = (held ?? 0) + (earns ? hours : 0)
  }
  return held
}

export function charismaIn(rows: readonly Row[]): number | null {
  return hoursAtEaseIn(rows, namesAnyone)
}

export function connectionIn(rows: readonly Row[], relationship: string): number | null {
  return hoursAtEaseIn(rows, (values) => namesRelationship(values, relationship))
}
