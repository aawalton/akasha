import { checkScalar } from "../document/value.ts"
import { expressionOf, LADDER, RANKS } from "../document/template.ts"
import { within } from "./stated.ts"
import type { Fault, Held, Rule, Stated } from "./stated.ts"

export interface Bound {
  readonly says: string
  readonly holds: (text: string) => boolean
}

function admittedIn(stated: Held): readonly string[] | null {
  if (typeof stated === "string") return null
  const named = Array.isArray(stated)
    ? stated.every((one) => typeof one === "string")
      ? (stated as readonly string[])
      : null
    : Object.keys(stated as { readonly [key: string]: Held })
  return named === null || named.length === 0 ? null : named
}

export function boundsFor(stated: Stated): { bounds: readonly Bound[] | null; why: string | null } {
  const bounds: Bound[] = []
  if (stated.pattern !== null || stated.backstop !== null) {
    const { expression, why } = expressionOf("", stated.pattern, stated.backstop)
    if (expression === null) return { bounds: null, why }
    bounds.push({
      says: `matching \`${stated.pattern}\` within ${expression.backstop} characters`,
      holds: (text) => checkScalar(text, expression) === null,
    })
  }
  if (stated.values !== null) {
    const held = admittedIn(stated.values)
    if (held === null) return { bounds: null, why: "`values` states no set of the values this key may take" }
    bounds.push({
      says: `one of ${held.map((one) => `\`${one}\``).join(", ")}`,
      holds: (text) => held.includes(text),
    })
  }
  if (stated.max !== null) {
    const ceiling = LADDER.get(stated.max.trim().toLowerCase())
    if (ceiling === undefined)
      return { bounds: null, why: `\`max: ${stated.max}\` names no rank on the ladder — ${RANKS}` }
    bounds.push({ says: `within ${ceiling} characters`, holds: (text) => text.length <= ceiling })
  }
  return { bounds, why: null }
}

export function narrowed(rule: Rule, bounds: readonly Bound[]): Rule {
  if (bounds.length === 0) return rule
  const inside = (value: Held): Fault | null => {
    if (typeof value === "string")
      return bounds.every((one) => one.holds(value.trim())) ? null : { fault: "text", at: value }
    for (const [at, item] of Array.isArray(value)
      ? value.map((one) => ["in a list", one] as const)
      : Object.entries(value).map(([key, one]) => [`at \`${key}\``, one] as const)) {
      if (typeof item !== "string") continue
      if (bounds.every((one) => one.holds(item.trim()))) continue
      return within(`\`${item}\` ${at}`)
    }
    return null
  }
  return {
    says: [rule.says, ...bounds.map((one) => one.says)].join(", "),
    holds: (value) => rule.holds(value) ?? inside(value),
  }
}

/**
 * The rule with one sentinel standing outside every bound.
 *
 * A BOUND NARROWS THE VALUES A KEY MAY TAKE, AND A SENTINEL IS NOT ONE OF THEM. It states that
 * the key takes no value, which is the standing `blanked` below already gives a blank one.
 */
export function excepting(rule: Rule, sentinel: string): Rule {
  return {
    says: rule.says,
    holds: (value) =>
      typeof value === "string" && value.trim() === sentinel ? null : rule.holds(value),
  }
}

export function blanked(rule: Rule): Rule {
  return {
    says: `${rule.says}, or nothing at all`,
    holds: (value) => (typeof value === "string" && value.trim() === "" ? null : rule.holds(value)),
  }
}
