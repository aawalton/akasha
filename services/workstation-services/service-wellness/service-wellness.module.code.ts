import { mergeUncommitted } from "@akasha/pages/page-uncommitted"
import type { Health } from "../service-health/service-health.module.code.ts"

export const WELL = "well"

export const LOOKED_AT = "lookedAt"

export function verdictFor(one: Health, at: string): Record<string, unknown> {
  return { [WELL]: one.broken === null, [LOOKED_AT]: at }
}

export function keepVerdicts(root: string, health: readonly Health[], at: string): undefined {
  for (const one of health) mergeUncommitted(root, one.pagePath, verdictFor(one, at))
}
