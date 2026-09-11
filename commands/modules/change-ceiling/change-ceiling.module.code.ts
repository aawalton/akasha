import type { Answer as Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { closing, opening, type Taken } from "akasha/checks/modules/cost/check-cost.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const MAX_CPU = "maxCpuSeconds"

export const ALLOWED_CPU = 300

export function cpuAllowedIn(value: Value | null): number {
  const said = value === null ? undefined : value[MAX_CPU]
  return typeof said === "number" && said > 0 ? said : ALLOWED_CPU
}

export function spentBetween(before: Taken, after: Taken): number {
  return Number((after.cpu - before.cpu + (after.childCpu - before.childCpu)).toFixed(3))
}

export function overIts(slug: string, spent: number, allowed: number): string | null {
  if (spent <= allowed) return null
  return (
    `\`${slug}\` ran to the end and spent ${spent} processor seconds, past the ${allowed} its page` +
    ` allows, so nothing it answered is kept. Ask Alan where you think that ceiling needs raising.`
  )
}

export async function underIts(
  slug: string,
  stated: Value | null,
  run: () => Promise<Said>
): Promise<Said> {
  const allowed = cpuAllowedIn(stated)
  const started = opening()
  const made = await run()
  const over = overIts(slug, spentBetween(started, closing()), allowed)
  return over === null ? made : { edits: [], refused: over }
}
