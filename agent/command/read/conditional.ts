import { readFileSync } from "node:fs"
import { rootsHere } from "../../../repo/roots/roots.ts"
import { listField } from "../../../page/frontmatter.ts"
import { blockOf } from "../../../page/text/text.ts"
import { standingHere } from "../../../page/required-reading/warrant/warrant.ts"
import type { Target } from "./target.ts"

const CONDITIONAL_KEY = "conditional-reading-slugs"

const CONDITIONAL_TYPE = "task"

const DEFINITION = /^#[ \t]+Definition[ \t]*$/

const HEADING = /^#[ \t]/

export interface Conditional {
  readonly slug: string
  readonly named: string
  readonly definition: string
}

function bodyAt(absolute: string): string | null {
  try {
    return readFileSync(absolute, "utf8")
  } catch {
    return null
  }
}

function definitionIn(body: string): string {
  const lines = body.split("\n")
  const at = lines.findIndex((one) => DEFINITION.test(one))
  if (at === -1) return ""
  const held: string[] = []
  for (const line of lines.slice(at + 1)) {
    if (HEADING.test(line)) break
    held.push(line)
  }
  return held.join("\n").trim()
}

export function conditionalBelow(standing: readonly Target[], from: string): readonly Conditional[] {
  const { index } = standingHere()
  const roots = rootsHere()
  const held = new Set(standing.map((one) => one.absolute))
  const found = new Map<string, Conditional>()
  for (const one of standing) {
    const body = bodyAt(one.absolute)
    if (body === null) continue
    const { fm, why } = blockOf(body)
    if (why !== null) continue
    for (const slug of listField(fm, CONDITIONAL_KEY)) {
      if (found.has(slug)) continue
      const page = index.domainAt(slug, CONDITIONAL_TYPE)
      if (page === null) continue
      const root = roots[page.repo]
      if (root === undefined) continue
      const absolute = `${root}/${page.key}`
      if (held.has(absolute)) continue
      const text = bodyAt(absolute)
      if (text === null) continue
      const named = from !== "" && absolute.startsWith(`${from}/`) ? page.key : absolute
      found.set(slug, { slug, named, definition: definitionIn(text) })
    }
  }
  return [...found.values()].sort((left, right) => left.slug.localeCompare(right.slug))
}

export function conditionalCaption(count: number): string {
  return (
    `read:   ${count} document(s) below are conditional reading: what stands above names them, and each is ` +
    "required once you judge it bears on what you are doing. Its definition is here and its body is not — " +
    "read the one you need by its path and you have it whole."
  )
}

export function conditionalText(one: Conditional): string {
  return `cond:   ${one.slug} — ${one.named}\n${one.definition}`
}
