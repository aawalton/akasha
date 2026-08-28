import { checkScalar } from "../document/value.ts"
import { LADDER, RANKS } from "../document/template.ts"
import { NONE } from "../text/text.ts"
import { CLAIM, fileIn } from "../repo-claim.ts"
import { recordRule } from "./record.ts"
import { templateRule } from "./template.ts"
import { addressParts, ADDRESS_SAYS, RELATION_ADDRESS } from "../page-address.ts"
import { boundsFor, narrowed } from "./bounds.ts"
import { nested, scalarRule, textOf, within, wrongShape } from "./stated.ts"
import type { Fault, Held, Rule, Vocabulary } from "./stated.ts"

export const TYPE = "type"

export const TYPE_VOCABULARY = "page-property-type"

export const TYPE_SLUG = "type-slug"

export const OWN_TYPE = "{type}"

const BACK_REFERENCE = /^\{([a-z][a-z0-9-]*)\}$/

export function backReference(type: string): string | null {
  return BACK_REFERENCE.exec(type.trim())?.[1] ?? null
}

export const SELECT = "select"

export function refusalOf(key: string, fault: Fault, states: string, says: string): string {
  if (fault.fault === "text")
    return fault.at.trim() === ""
      ? `\`${key}:\` stands with nothing after it, where ${states} states ${says}`
      : `\`${key}: ${fault.at}\` is not ${says}, which is what ${states} states`
  return fault.wanted === undefined
    ? `\`${key}\` holds ${fault.measured} where ${states} states ${says}`
    : `\`${key}\` holds ${fault.measured}, where ${fault.wanted}`
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const COUNT = /^-?\d+(?:\.\d+)?$/
const SEQ = /^[1-9]\d*$/
const INSTANT = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}/
const WEB = /^https?:\/\/\S+$/
const PROCESS = /^\d+-\d+$/
const ONE_FILE = /^[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)*$/
const INNER = String.raw`[a-z][a-z0-9-]*(?:\([^()]*\))?`
const BOUND = String.raw`(?:,\s*max\s+([1-9]\d*)\s*)?`
const LIST = new RegExp(String.raw`^list\(\s*(${INNER})\s*${BOUND}\)$`)
const MAP = new RegExp(String.raw`^map\(\s*(${INNER})\s*${BOUND}\)$`)
const RANGE = new RegExp(String.raw`^range\(\s*(${INNER})\s*\)$`)
const SELECT_OF = new RegExp(String.raw`^${SELECT}\(\s*(${INNER})\s*\)$`)

function listRule(of: Rule, max: number): Rule {
  return {
    says: max === Number.POSITIVE_INFINITY ? `a list, each ${of.says}` : `a list of at most ${max}, each ${of.says}`,
    holds: (value) => {
      if (!Array.isArray(value)) return wrongShape(value)
      if (value.length === 0) return within("an empty list")
      if (value.length > max) return within(`a list of ${value.length}`)
      for (const item of value) {
        const fault = of.holds(item)
        if (fault === null) continue
        return nested(`${textOf(fault)} in a list`, fault)
      }
      return null
    },
  }
}

function mapRule(of: Rule, max: number): Rule {
  const shape = max === Number.POSITIVE_INFINITY ? "a map" : `a map of at most ${max}`
  return {
    says: `${shape}, each value ${of.says}`,
    holds: (value) => {
      if (typeof value === "string" || Array.isArray(value)) return wrongShape(value)
      const entries = Object.entries(value)
      if (entries.length === 0) return within("an empty map")
      if (entries.length > max) return within(`a map of ${entries.length}`)
      for (const [key, held] of entries) {
        const fault = of.holds(held)
        if (fault === null) continue
        return nested(`${textOf(fault)} at \`${key}\``, fault)
      }
      return null
    },
  }
}

function rangeRule(of: Rule): Rule {
  return {
    says: `one bound, or two written \`lower-upper\`, each ${of.says}`,
    holds: (value) => {
      if (typeof value !== "string") return wrongShape(value)
      const written = value.trim().split("-")
      if (written.length > 2) return within(`a range written with ${written.length - 1} separators`)
      for (const one of written) {
        const fault = of.holds(one)
        if (fault === null) continue
        return nested(`\`${one}\` in a range`, fault)
      }
      return null
    },
  }
}

function selectRule(of: Rule): Rule {
  return { says: `one of a stated set, ${of.says}`, holds: of.holds }
}

const WRAPPED: readonly (readonly [RegExp, (of: Rule, max: number) => Rule])[] = [
  [LIST, listRule],
  [MAP, mapRule],
  [RANGE, (of) => rangeRule(of)],
  [SELECT_OF, (of) => selectRule(of)],
]

function parsesAsJson(text: string): boolean {
  try {
    JSON.parse(text)
    return true
  } catch {
    return false
  }
}

const oneLineOfJson: Rule = scalarRule(
  "one line of JSON text",
  (text) => !text.includes("\n") && parsesAsJson(text)
)

const points: Rule = scalarRule("the UUID of the page it points at", (text) => UUID.test(text))

const RELATION_SLUG = "relation-slug"

export function relationSlugRule(slugProperty: string | null): Rule {
  const says =
    slugProperty === null
      ? "the slug of the page it points at"
      : `the \`${slugProperty}\` of the page it points at`
  return scalarRule(says, (text) => checkScalar(text, { type: "slug" }) === null)
}

export const RULES: ReadonlyMap<string, Rule> = new Map<string, Rule>([
  ["lower-kebab-case", scalarRule("a name in lower kebab case", (text) => checkScalar(text, { type: "slug" }) === null)],
  [
    "text",
    {
      says: "a non-empty value",
      holds: (value) =>
        typeof value !== "string" ? wrongShape(value) : value === "" ? { fault: "text", at: value } : null,
    },
  ],
  ["json", oneLineOfJson],
  ["template", templateRule],
  ["uuid", scalarRule("a UUID", (text) => UUID.test(text))],
  ["process", scalarRule("a pid and a start time, written `<pid>-<start>`", (text) => PROCESS.test(text))],
  ["relation-id", points],
  ["relation-seq", scalarRule("the seq of the page it points at", (text) => SEQ.test(text))],
  [RELATION_SLUG, relationSlugRule(null)],
  [RELATION_ADDRESS, scalarRule(ADDRESS_SAYS, (text) => addressParts(text) !== null)],
  ["relation-name", scalarRule("the name of the page it points at", (text) => text !== "")],
  ["boolean", scalarRule("`true` or `false`", (text) => text === "true" || text === "false")],
  ["number", scalarRule("a number", (text) => COUNT.test(text))],
  ["size", scalarRule(`a rank on the size ladder — ${RANKS}`, (text) => LADDER.has(text.toLowerCase()))],
  ["instant", scalarRule("an ISO 8601 instant", (text) => INSTANT.test(text))],
  ["calendar-date", scalarRule("a calendar day, written `YYYY-MM-DD`", (text) => checkScalar(text, { type: "date" }) === null)],
  ["url", scalarRule("an http or https URL", (text) => WEB.test(text))],
  ["path", scalarRule("a repo and a glob, written `<repo>:<glob>`", (text) => CLAIM.test(text))],
  [
    "region",
    scalarRule(
      "a glob of the repo its own key names",
      (text) => !CLAIM.test(text) && text !== ""
    ),
  ],
  [
    "file",
    scalarRule(
      "one path with no glob, written `<repo>:<path>` or bare for the instructions repo",
      (text) => ONE_FILE.test(fileIn(text).path)
    ),
  ],
  [NONE, scalarRule(`\`${NONE}\``, (text) => text === NONE)],
])

export function arms(text: string): readonly string[] {
  return text
    .split("|")
    .map((one) => one.trim())
    .filter((one) => one !== "")
}

function nameOf(one: string): string {
  for (const [shape] of WRAPPED) {
    const inner = shape.exec(one)?.[1]
    if (inner !== undefined) return nameOf(inner)
  }
  return one
}

export function namesIn(type: string): readonly string[] {
  return arms(type).map(nameOf)
}

function selecting(one: string): boolean {
  if (SELECT_OF.test(one)) return true
  for (const [shape] of WRAPPED) {
    const inner = shape.exec(one)?.[1]
    if (inner !== undefined) return selecting(inner)
  }
  return false
}

export function selects(type: string): boolean {
  return arms(type).some(selecting)
}
function namedTypeRule(vocabulary: Vocabulary): { rule: Rule | null; why: string | null } {
  const { names } = vocabulary
  if (names === null) return { rule: null, why: vocabulary.why }
  const listed = [...names].sort().map((one) => `\`${one}\``).join(", ")
  return {
    rule: scalarRule(`a type name \`${TYPE_VOCABULARY}\` claims (${listed})`, (text) => {
      const sides = namesIn(text)
      return sides.length > 0 && sides.every((one) => backReference(one) !== null || names.has(one))
    }),
    why: null,
  }
}

function armRule(
  one: string,
  vocabulary: Vocabulary,
  seen: ReadonlySet<string> = new Set(),
  slugProperty: string | null = null
): { rule: Rule | null; why: string | null } {
  if (one === TYPE) return namedTypeRule(vocabulary)
  if (one === RELATION_SLUG && slugProperty !== null) return { rule: relationSlugRule(slugProperty), why: null }
  for (const [shape, wrap] of WRAPPED) {
    const bounded = shape.exec(one)
    if (bounded === null) continue
    const { rule, why } = armRule(bounded[1]!, vocabulary, seen, slugProperty)
    if (rule === null) return { rule: null, why }
    return { rule: wrap(rule, bounded[2] === undefined ? Number.POSITIVE_INFINITY : Number(bounded[2])), why: null }
  }
  const { records, sets } = vocabulary
  const fields = records === null ? undefined : records.get(one)
  if (fields !== undefined) {
    if (seen.has(one)) return { rule: null, why: `\`${one}\` is built from itself` }
    return recordRule(one, fields, (field) => {
      const { rule, why } = armsRule(field.type, vocabulary, new Set([...seen, one]))
      if (rule === null) return { rule: null, why }
      const { bounds, why: bounded } = boundsFor(field.stated)
      return bounds === null ? { rule: null, why: bounded } : { rule: narrowed(rule, bounds), why: null }
    })
  }
  const set = sets === null ? undefined : sets.get(one)
  if (set !== undefined) {
    if (seen.has(one)) return { rule: null, why: `\`${one}\` is built from itself` }
    const { rule, why } = armsRule(set.of, vocabulary, new Set([...seen, one]))
    if (rule === null) return { rule: null, why }
    const { bounds, why: bounded } = boundsFor(set.stated)
    return bounds === null ? { rule: null, why: bounded } : { rule: narrowed(rule, bounds), why: null }
  }
  const rule = RULES.get(one)
  if (rule !== undefined) return { rule, why: null }
  if (records === null || sets === null) return { rule: null, why: vocabulary.why }
  return { rule: null, why: `\`${one}\` is a type this states no rule for` }
}

function armsRule(
  type: string,
  vocabulary: Vocabulary,
  seen: ReadonlySet<string>,
  slugProperty: string | null = null
): { rule: Rule | null; why: string | null } {
  const named = arms(type)
  const [first] = named
  if (first === undefined) return { rule: null, why: "it declares no `type:`" }
  const found: Rule[] = []
  for (const one of named) {
    const { rule, why } = armRule(one, vocabulary, seen, slugProperty)
    if (rule === null) return { rule: null, why }
    found.push(rule)
  }
  const [only, ...rest] = found
  if (rest.length === 0) return { rule: only!, why: null }
  return {
    rule: {
      says: found.map((one) => one.says).join(" or "),
      holds: (value) => {
        const faults: Fault[] = []
        for (const one of found) {
          const fault = one.holds(value)
          if (fault === null) return null
          faults.push(fault)
        }
        return faults.find((one) => one.fault === "text" || one.inside) ?? faults[0]!
      },
    },
    why: null,
  }
}

export function ruleFor(
  type: string,
  vocabulary: Vocabulary,
  slugProperty: string | null = null
): { rule: Rule | null; why: string | null } {
  return armsRule(type, vocabulary, new Set(), slugProperty)
}
