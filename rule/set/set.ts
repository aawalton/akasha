import { readFileSync } from "node:fs"
import { listField, type Frontmatter } from "../../page/frontmatter.ts"
import { slugNamed } from "../../page/page-address.ts"
import { placeDirOf, PROPERTY_GLOBS, scanIn } from "../../page/page-types.ts"
import { blockOf, stringAt } from "../../page/text/text.ts"
import { rootsHere } from "../../repo/roots/roots.ts"

export type FieldType = "text" | "number" | "date" | "enum" | "list"

export const COMPARISONS: Readonly<Record<FieldType, readonly string[]>> = {
  text: ["is", "starts with", "ends with", "contains"],
  number: ["is", "is above"],
  date: ["is", "on or after"],
  enum: ["is"],
  list: ["contains"],
}

export const NEGATIONS: Readonly<Record<string, string>> = {
  is: "is not",
  "starts with": "does not start with",
  "ends with": "does not end with",
  contains: "does not contain",
  "is above": "is not above",
  "on or after": "is before",
}

export interface Field {
  readonly name: string
  readonly type: FieldType
}

export interface RuleSet {
  readonly slug: string
  readonly path: RegExp
  readonly fields: readonly Field[]
}

const RULE_SET_TYPE = "rules-engine-rule-set"

const NUMBER = "number"

const CALENDAR_DATE = "calendar-date"

function statedAt(root: string, relPath: string): Frontmatter | null {
  let text: string
  try {
    text = readFileSync(`${root}/${relPath}`, "utf8")
  } catch {
    return null
  }
  const { fm, why } = blockOf(text)
  return why === null ? fm : null
}

function eachStated(globs: readonly string[]): readonly Frontmatter[] {
  const found: Frontmatter[] = []
  for (const [repo, root] of Object.entries(rootsHere())) {
    if (root === undefined) continue
    for (const relPath of scanIn(root, globs, repo)) {
      const fm = statedAt(root, relPath)
      if (fm !== null) found.push(fm)
    }
  }
  return found
}

function typeOf(fm: Frontmatter): FieldType {
  if (stringAt(fm, "normalized-by-slug") !== null) return "enum"
  if (listField(fm, "values").length > 0) return "enum"
  const declared = stringAt(fm, "type")
  if (declared === NUMBER) return NUMBER
  if (declared === CALENDAR_DATE) return "date"
  return "text"
}

function fieldsOn(appliesTo: string): readonly Field[] {
  const fields: Field[] = []
  for (const fm of eachStated(PROPERTY_GLOBS)) {
    if (slugNamed(stringAt(fm, "defined-on-slug")) !== appliesTo) continue
    const key = stringAt(fm, "key")
    if (key === null) continue
    fields.push({ name: key, type: typeOf(fm) })
  }
  return [...fields].sort((one, other) => one.name.localeCompare(other.name))
}

export function ruleSetNamed(slug: string): RuleSet | null {
  for (const fm of eachStated([`${placeDirOf(RULE_SET_TYPE)}/**/*.md`])) {
    if (stringAt(fm, "slug") !== slug) continue
    const pattern = stringAt(fm, "path-pattern")
    const appliesTo = slugNamed(stringAt(fm, "applies-to-slug"))
    if (pattern === null || appliesTo === null) return null
    return { slug, path: new RegExp(pattern), fields: fieldsOn(appliesTo) }
  }
  return null
}
