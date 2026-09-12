import {
  directivesIn,
  ruleOf,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import { widest } from "akasha/commands/modules/namespace-listing/namespace-listing.module.code.ts"
import type { Taking } from "akasha/commands/properties/taking.record-property.types.ts"

const TAKING = "taking"

const INVARIANTS = "invariants"

const STATEMENT = "statement"

const INVARIANT_KIND = "invariantKind"

const DIRECTIVES = "directives"

const NOT_YET = "Not yet true:"

export function rulesIn(page: Record<string, unknown>): readonly string[] {
  return directivesIn(page[DIRECTIVES]).map(ruleOf)
}

export type Parted = {
  readonly holds: readonly string[]
  readonly notYet: readonly string[]
}

export type Surface = Parted & {
  readonly taking: Taking
}

export function statementsIn(page: Record<string, unknown>, notYet: ReadonlySet<string>): Parted {
  const held = page[INVARIANTS]
  const holds: string[] = []
  const later: string[] = []
  if (!Array.isArray(held)) return { holds, notYet: later }
  for (const one of held) {
    if (typeof one !== "object" || one === null) continue
    const said = one as Record<string, unknown>
    const stated = said[STATEMENT]
    if (typeof stated !== "string") continue
    const kind = said[INVARIANT_KIND]
    if (typeof kind === "string" && notYet.has(kind)) later.push(stated)
    else holds.push(stated)
  }
  return { holds, notYet: later }
}

export function surfaceOf(
  page: Record<string, unknown> | null,
  notYet: ReadonlySet<string>
): Surface | null {
  if (page === null) return null
  const taking = page[TAKING]
  if (!Array.isArray(taking)) return null
  return { taking: taking as Taking, ...statementsIn(page, notYet) }
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
  if (surface.holds.length > 0) report.push("", ...surface.holds)
  if (surface.notYet.length > 0) report.push("", NOT_YET, ...surface.notYet)
  for (const one of rules) report.push("", one)
  return report
}
