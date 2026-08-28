import type { Corpus } from "./corpus.module.code.ts"

const NOT_A_PROPERTY = new Set(["id", "slug", "pageTypeSlug"])

const EXTENDS = "extendsSlug"

function kebab(key: string): string {
  return key.replace(/[A-Z]/g, (one) => `-${one.toLowerCase()}`)
}

export function typeChainOf(slug: string, corpus: Corpus): readonly string[] {
  const at = corpus.at(slug)
  if (at === null) return []
  const found: string[] = []
  const walked = new Set<string>([slug])
  let here: string | null = at.pageTypeSlug
  while (here !== null && !walked.has(here)) {
    walked.add(here)
    if (corpus.at(here) !== null) found.push(here)
    const value = corpus.valueOf(here)
    const above = value === null ? null : value[EXTENDS]
    here = typeof above === "string" ? above : null
  }
  return found
}

export function propertyTypesOf(slug: string, corpus: Corpus): readonly string[] {
  const value = corpus.valueOf(slug)
  if (value === null) return []
  const found: string[] = []
  for (const key of Object.keys(value)) {
    if (NOT_A_PROPERTY.has(key)) continue
    const named = kebab(key)
    const at = corpus.at(named)
    if (at !== null && at.pageTypeSlug === "page-property-type") found.push(named)
  }
  return found
}

export function warrantsFor(slug: string, corpus: Corpus): readonly string[] {
  const seeds = [
    ...corpus.above(slug),
    ...corpus.requiredBy(slug),
    ...typeChainOf(slug, corpus),
    ...propertyTypesOf(slug, corpus),
  ]
  const reached = new Set<string>()
  const queue = [...seeds]
  while (queue.length > 0) {
    const one = queue.shift()
    if (one === undefined || one === slug || reached.has(one)) continue
    reached.add(one)
    for (const next of corpus.requiredBy(one)) queue.push(next)
    for (const next of corpus.above(one)) queue.push(next)
    for (const next of typeChainOf(one, corpus)) queue.push(next)
    for (const next of propertyTypesOf(one, corpus)) queue.push(next)
  }
  return [...reached].sort()
}

export function conditionalFor(slugs: readonly string[], corpus: Corpus): readonly string[] {
  const found = new Set<string>()
  for (const slug of slugs) for (const one of corpus.conditionalBelow(slug)) found.add(one)
  return [...found].sort()
}
