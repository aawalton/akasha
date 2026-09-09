import { everyOfType, readingIn } from "@akasha/pages/index-reading"
import { kindsUnder } from "@akasha/pages/page-type-descent"
import { textAt, type Value, valueAt } from "@akasha/pages/page-value"
import { domainsRead } from "akasha/domains/modules/reading/domain-reading.module.code.ts"

const TERM = "term"

const SPELT = /`([^`]*)`/g

const BARE = /[\p{L}][\p{L}']*/gu

const CAMEL = /(?<=[a-z0-9])(?=[A-Z])/gu

const ADDRESS = /[/\\]|^~|^https?:|\.[a-z]+$/u

export type TermKind = "domain-name" | "page-address" | "foreign-name" | "common-language"

export interface TermRead {
  readonly form: string
  readonly kind: TermKind
  readonly defined: boolean
}

export function kebabOf(form: string): string {
  return form.replace(CAMEL, "-").replaceAll("_", "-").toLowerCase()
}

function spellingsIn(root: string): readonly string[] {
  const found: string[] = []
  for (const kind of kindsUnder(TERM, readingIn(root), (path) => valueAt(path, root))) {
    for (const page of everyOfType(root, kind)) {
      let value: Value | null
      try {
        value = valueAt(page.path, root)
      } catch {
        continue
      }
      if (value === null) continue
      const spelling = textAt(value, "spelling")
      if (spelling !== null) found.push(spelling.toLowerCase())
    }
  }
  return found
}

export function definedTerms(root: string): ReadonlySet<string> {
  const found = new Set(domainsRead(root).map((read) => read.slug))
  for (const spelling of spellingsIn(root)) found.add(spelling)
  return found
}

function speltKind(form: string, defined: ReadonlySet<string>): TermKind {
  if (ADDRESS.test(form)) return "page-address"
  if (defined.has(form) || defined.has(kebabOf(form))) return "domain-name"
  return "foreign-name"
}

export function termsIn(text: string, defined: ReadonlySet<string>): readonly TermRead[] {
  const found: TermRead[] = []
  for (const match of text.matchAll(SPELT)) {
    const form = (match[1] ?? "").trim()
    if (form === "") continue
    const kind = speltKind(form, defined)
    found.push({ form, kind, defined: kind !== "foreign-name" || defined.has(kebabOf(form)) })
  }
  for (const match of text.replace(SPELT, " ").matchAll(BARE)) {
    const form = (match[0] ?? "").toLowerCase()
    found.push({ form, kind: "common-language", defined: defined.has(form) })
  }
  return found
}
