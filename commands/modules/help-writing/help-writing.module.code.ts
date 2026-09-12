import {
  directivesIn,
  ruleOf,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import { widest } from "akasha/commands/modules/namespace-listing/namespace-listing.module.code.ts"
import type { Taking } from "akasha/commands/properties/taking.record-property.types.ts"

const TAKING = "taking"

const INVARIANTS = "invariants"

const STATEMENT = "statement"

const DIRECTIVES = "directives"

export function rulesIn(page: Record<string, unknown>): readonly string[] {
  return directivesIn(page[DIRECTIVES]).map(ruleOf)
}

export type Surface = {
  readonly taking: Taking
  readonly invariants: readonly string[]
}

export function statementsIn(page: Record<string, unknown>): readonly string[] {
  const held = page[INVARIANTS]
  if (!Array.isArray(held)) return []
  const said: string[] = []
  for (const one of held) {
    if (typeof one !== "object" || one === null) continue
    const stated = (one as Record<string, unknown>)[STATEMENT]
    if (typeof stated === "string") said.push(stated)
  }
  return said
}

export function surfaceOf(page: Record<string, unknown> | null): Surface | null {
  if (page === null) return null
  const taking = page[TAKING]
  if (!Array.isArray(taking)) return null
  return { taking: taking as Taking, invariants: statementsIn(page) }
}

export function helpOf(
  calledAs: string,
  definition: string | null,
  surface: Surface,
  rules: readonly string[]
): readonly string[] {
  const wide = widest(surface.taking.map((one) => one.said))
  const report = [definition === null ? calledAs : `${calledAs} — ${definition}`, ""]
  for (const one of surface.taking) report.push(`  ${one.said.padEnd(wide)}  ${one.takes}`)
  if (surface.invariants.length > 0) report.push("", ...surface.invariants)
  for (const one of rules) report.push("", one)
  return report
}
