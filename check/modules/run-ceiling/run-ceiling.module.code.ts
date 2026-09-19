import type { Cost } from "akasha/check/modules/cost/check-cost.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { refusalText } from "akasha/check/modules/refusal-text/refusal-text.module.code.ts"

export const CHECK_GROUP = "check"

export const AUDIT_GROUP = "audit"

const OVER_CEILING = "check-over-its-ceiling"

export type Bounded = {
  readonly slug: string
  readonly page: string
  readonly checkCeiling?: number | null
  readonly auditCeiling?: number | null
}

export function ranOver(one: Bounded, group: string, cost: Cost): Judged | null {
  const ceiling = group === AUDIT_GROUP ? one.auditCeiling : one.checkCeiling
  if (ceiling === undefined || ceiling === null) return null
  const spent = Number((cost.cpuSeconds + cost.childCpuSeconds).toFixed(3))
  if (spent <= ceiling) return null
  return {
    path: one.page,
    reason: refusalText(OVER_CEILING, {
      slug: one.slug,
      spent: String(spent),
      ceiling: String(ceiling),
    }),
  }
}
