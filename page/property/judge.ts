import { parseFrontmatter, type Frontmatter } from "../frontmatter.ts"
import { choicesHeld } from "./choice.ts"
import type { Property } from "./property.ts"
import { undeclaredKey } from "./key-spelling.ts"
import { NONE, stringAt } from "../text/text.ts"
import { blanked, boundsFor, excepting, narrowed } from "./bounds.ts"
import { arms, backReference, refusalOf, ruleFor, selects, TYPE } from "./value.ts"
import { VALUES } from "./stated.ts"
import type { Held, Rule, Vocabulary } from "./stated.ts"
import { refusalText } from "../../refusal/refusal.ts"

export interface Judgment {
  readonly refusals: readonly string[]
  readonly keys: number
  readonly unjudged: readonly string[]
  readonly why: string | null
}

export interface RowJudgment {
  readonly refusals: readonly string[]
  readonly keys: number
}

function typeStated(property: Property, fm: Frontmatter): { type: string | null; why: string | null } {
  const key = backReference(property.type)
  if (key === null) return { type: property.type, why: null }
  const own = stringAt(fm, key)
  if (own === null)
    return { type: null, why: `it takes whatever this file's own \`${key}:\` names, and this file names none` }
  return { type: own, why: null }
}

const SHAPE_SIDE = "page/shape/shape.ts"

const declaredAt = (property: Property): string => `\`${property.at}\``

export function redeclaration(several: readonly Property[]): string | null {
  const [first] = several
  if (first === undefined || several.length < 2) return null
  const on = new Set(several.map((one) => one.on))
  for (const one of several) {
    if (one.narrowsSlug === null) continue
    if (one.narrowsSlug === one.on || !on.has(one.narrowsSlug))
      return refusalText("page-narrowing-unresolved", {
        path: one.at,
        narrows: one.narrowsSlug,
        key: one.name,
      })
  }
  const base = several.filter((one) => one.narrowsSlug === null)
  if (base.length === 1) return null
  return refusalText("page-redeclaration-silent", {
    key: first.name,
    at: base.map(declaredAt).join(" and at "),
    side: SHAPE_SIDE,
  })
}

export interface Armed {
  readonly rule: Rule | null
  readonly states: string
  readonly why: string | null
}

export interface Arming {
  readonly armed: ReadonlyMap<Property, Armed>
  readonly ownType: (property: Property, named: string) => Armed
}

export function armFor(property: Property, stated: string, vocabulary: Vocabulary): Armed {
  const { rule, why } = ruleFor(stated, vocabulary, property.slugProperty)
  if (rule === null) return { rule: null, states: "", why }
  const { bounds, why: unbounded } = boundsFor(property.stated)
  if (bounds === null) return { rule: null, states: "", why: unbounded }
  const states = bounds.length === 0 ? `\`${stated}\`` : `\`${stated}\` narrowed on \`${property.on}\``
  // NARROWING RUNS OVER THE UNION OF THE ARMS, SO THE `none` ARM IS LIFTED BACK OUT OF IT.
  // `ruleFor` unions the type`s arms and `narrowed` then wraps the whole of that, unable to
  // see which arm admitted a value — so a stated set was applied to the sentinel arm as well.
  // `select(slug) | none` admitted `none` and then refused it, in a message that named `none`
  // among the values it would take, because the message reads the type and the decision reads
  // the bounds. Every `| none` type carrying a bound failed this way; a select is only where it
  // surfaced, a select stating no `values:` being refused outright, so a select always has one.
  const bounded = narrowed(rule, bounds)
  const held = arms(stated).includes(NONE) ? excepting(bounded, NONE) : bounded
  return { rule: property.blank ? blanked(held) : held, states, why: null }
}

function heldBy(property: Property, fm: Frontmatter, vocabulary: Vocabulary | null, arming: Arming | null): Armed {
  const ready = arming?.armed.get(property)
  if (ready !== undefined) return ready
  const { type: stated, why: unstated } = typeStated(property, fm)
  if (stated === null) return { rule: null, states: "", why: unstated }
  if (arming !== null) return arming.ownType(property, stated)
  if (vocabulary === null) return { rule: null, states: "", why: "nothing here names the types a value is judged against" }
  return armFor(property, stated, vocabulary)
}

function owedKey(one: Property): boolean {
  return one.required && !one.secret && one.attachment === null
}

export function judgeFrontmatter(
  text: string,
  slug: string,
  properties: readonly Property[],
  vocabulary: Vocabulary | null,
  arming: Arming | null = null
): Judgment {
  const fm = parseFrontmatter(text)
  if (fm.error !== null)
    return { refusals: [], keys: 0, unjudged: [], why: `its frontmatter cannot be accounted for: ${fm.error}` }
  const declared = new Map<string, Property[]>()
  for (const one of properties) declared.set(one.name, [...(declared.get(one.name) ?? []), one])
  const refusals: string[] = []
  const unjudged: string[] = []
  for (const key of fm.keys) {
    const several = declared.get(key)
    if (several === undefined) {
      refusals.push(undeclaredKey(key, slug, (name) => declared.has(name)))
      continue
    }
    const computed = several.find((one) => one.computed)
    if (computed !== undefined) {
      refusals.push(refusalText("page-key-computed", { key, on: computed.on }))
      continue
    }
    const secret = several.find((one) => one.secret)
    if (secret !== undefined) {
      refusals.push(refusalText("page-key-secret", { key, on: secret.on }))
      continue
    }
    const attachment = several.find((one) => one.attachment !== null)
    if (attachment !== undefined) {
      refusals.push(refusalText("page-key-attachment", { key, on: attachment.on }))
      continue
    }
    const clash = redeclaration(several)
    if (clash !== null) {
      refusals.push(clash)
      continue
    }
    for (const property of several) {
      const { rule, states, why } = heldBy(property, fm, vocabulary, arming)
      if (rule === null) {
        unjudged.push(`\`${key}\`: ${why}`)
        break
      }
      const fault = rule.holds(fm.fields.get(key) as Held)
      if (fault === null) continue
      refusals.push(refusalOf(key, fault, states, rule.says))
      break
    }
  }
  const owed = new Set<string>()
  for (const property of properties) {
    if (property.secret && property.required)
      unjudged.push(
        `\`${property.name}\`: it is secret on \`${property.on}\`, so its value stands in the page's sops file and this reads frontmatter`
      )
    if (property.attachment !== null && property.required)
      unjudged.push(
        `\`${property.name}\`: it is an attachment on \`${property.on}\`, so its value stands beside the page in a \`.attachment.${property.attachment}\` file and this reads frontmatter`
      )
    if (owedKey(property) && !fm.fields.has(property.name) && !owed.has(property.name)) {
      owed.add(property.name)
      refusals.push(
        refusalText("page-key-required-unstated", { key: property.name, on: property.on })
      )
    }
  }
  const declaring = properties.find((one) => one.name === TYPE && one.type === TYPE)
  const states = declaring === undefined ? null : stringAt(fm, TYPE)
  if (states !== null && selects(states) && !fm.fields.has(VALUES))
    refusals.push(refusalText("page-select-states-no-values", { states }))
  const chosen = choicesHeld(properties, fm)
  return {
    refusals: [...refusals, ...chosen.refusals],
    keys: fm.keys.length,
    unjudged: [...unjudged, ...chosen.unjudged],
    why: null,
  }
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
