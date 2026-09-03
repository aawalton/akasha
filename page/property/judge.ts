import { refusalText } from "../../refusal/refusal.ts"
import { NONE } from "../text/text.ts"
import { blanked, boundsFor, excepting, narrowed } from "./bounds.ts"
import { undeclaredKey } from "./key-spelling.ts"
import type { Property } from "./property.ts"
import type { Rule, Vocabulary } from "./stated.ts"
import { arms, ruleFor } from "./value.ts"

export interface RowJudgment {
  readonly refusals: readonly string[]
  readonly keys: number
}

export interface Armed {
  readonly rule: Rule | null
  readonly states: string
  readonly why: string | null
}

export function armFor(property: Property, stated: string, vocabulary: Vocabulary): Armed {
  const { rule, why } = ruleFor(stated, vocabulary, property.slugProperty)
  if (rule === null) return { rule: null, states: "", why }
  const { bounds, why: unbounded } = boundsFor(property.stated)
  if (bounds === null) return { rule: null, states: "", why: unbounded }
  const states =
    bounds.length === 0 ? `\`${stated}\`` : `\`${stated}\` narrowed on \`${property.on}\``
  const bounded = narrowed(rule, bounds)
  const held = arms(stated).includes(NONE) ? excepting(bounded, NONE) : bounded
  return { rule: property.blank ? blanked(held) : held, states, why: null }
}

function owedKey(one: Property): boolean {
  return one.required && !one.secret && one.attachment === null
}

export function judgeRow(
  values: Readonly<Record<string, unknown>>,
  slug: string,
  properties: readonly Property[],
  standing?: Readonly<Record<string, unknown>> | null
): RowJudgment {
  const declared = new Set(properties.map((one) => one.name))
  const keys = Object.keys(values)
  const refusals: string[] = []
  for (const key of keys) {
    if (declared.has(key)) continue
    refusals.push(undeclaredKey(key, slug, (name) => declared.has(name)))
  }
  if (standing != null) {
    const owed = new Set<string>()
    for (const property of properties) {
      const key = property.name
      if (!owedKey(property) || owed.has(key) || key in values || !(key in standing)) continue
      owed.add(key)
      refusals.push(refusalText("page-row-required-dropped", { key, on: property.on }))
    }
  }
  return { refusals, keys: keys.length }
}
