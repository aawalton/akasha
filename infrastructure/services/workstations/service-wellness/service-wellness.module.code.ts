import type { Health } from "akasha/infrastructure/services/workstations/service-health/service-health.module.code.ts"
import {
  mergeUncommitted,
  uncommittedIn,
} from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"

export const WELL = "well"

export const LOOKED_AT = "lookedAt"

export function wellIn(one: Health): boolean {
  return one.broken === null
}

export function unchanged(root: string, one: Health): boolean {
  return uncommittedIn(root, one.pagePath)?.[WELL] === wellIn(one)
}

export function keepVerdicts(root: string, health: readonly Health[]): readonly string[] {
  const wrote: string[] = []
  for (const one of health) {
    if (unchanged(root, one)) continue
    mergeUncommitted(root, one.pagePath, { [WELL]: wellIn(one) })
    wrote.push(one.slug)
  }
  return wrote
}

export function looked(
  root: string,
  health: readonly Health[],
  now: string,
  slug: string
): readonly string[] {
  const wrote = keepVerdicts(root, health)
  const mine = health.find((one) => one.slug === slug)
  if (mine !== undefined) mergeUncommitted(root, mine.pagePath, { [LOOKED_AT]: now })
  return wrote
}
