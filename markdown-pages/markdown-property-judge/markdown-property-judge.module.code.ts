import type { Property } from "@akasha/pages-system/markdown-property"
import {
  blanked,
  boundsFor,
  excepting,
  narrowed,
} from "../markdown-property-bounds/markdown-property-bounds.module.code.ts"
import { undeclaredKey } from "../markdown-property-key-spelling/markdown-property-key-spelling.module.code.ts"
import type {
  Rule,
  Vocabulary,
} from "../markdown-property-stating/markdown-property-stating.module.code.ts"
import { arms, ruleFor } from "../markdown-property-value/markdown-property-value.module.code.ts"
import { refusalText } from "../markdown-refusal-text/markdown-refusal-text.module.code.ts"
import { NONE } from "../markdown-text-at/markdown-text-at.module.code.ts"

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
