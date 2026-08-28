import type { Corpus } from "./corpus.module.code.ts"

const NOT_A_PROPERTY = new Set(["id", "slug", "pageTypeSlug"])

const PAGE_TYPE = "page-type"

const PAGE_PROPERTY_TYPE = "page-property-type"

function kebab(key: string): string {
  return key.replace(/[A-Z]/g, (one) => `-${one.toLowerCase()}`)
}

export function typeChainOf(path: string, corpus: Corpus): readonly string[] {
  const at = corpus.at(path)
  if (at === null) return []
  const found: string[] = []
  const walked = new Set<string>()
  let here: string | null = at.pageTypeSlug
  while (here !== null && !walked.has(here)) {
    walked.add(here)
    const what = corpus.resolve(here, PAGE_TYPE)
    if (what.kind !== "one") break
    if (what.at.path !== path) found.push(what.at.path)
    const above = corpus.valueOf(what.at.path)?.["extendsSlug"]
    here = typeof above === "string" ? above : null
  }
  return found
}

export function propertyTypesOf(path: string, corpus: Corpus): readonly string[] {
  const value = corpus.valueOf(path)
  if (value === null) return []
  const found: string[] = []
  for (const key of Object.keys(value)) {
    if (NOT_A_PROPERTY.has(key)) continue
    const what = corpus.resolve(kebab(key), PAGE_PROPERTY_TYPE)
    if (what.kind === "one" && what.at.path !== path) found.push(what.at.path)
  }
  return found
}

export function warrantsFor(path: string, corpus: Corpus): readonly string[] {
  const seeds = [
    ...corpus.above(path),
    ...corpus.requiredBy(path),
    ...typeChainOf(path, corpus),
    ...propertyTypesOf(path, corpus),
  ]
  const reached = new Set<string>()
  const queue = [...seeds]
  while (queue.length > 0) {
    const one = queue.shift()
    if (one === undefined || one === path || reached.has(one)) continue
    reached.add(one)
    for (const next of corpus.requiredBy(one)) queue.push(next)
    for (const next of corpus.above(one)) queue.push(next)
    for (const next of typeChainOf(one, corpus)) queue.push(next)
    for (const next of propertyTypesOf(one, corpus)) queue.push(next)
  }
  return [...reached].sort()
}

export function closureFor(path: string, corpus: Corpus): readonly string[] {
  return warrantsFor(path, corpus)
}

export function conditionalFor(paths: readonly string[], corpus: Corpus): readonly string[] {
  const found = new Set<string>()
  for (const path of paths) for (const one of corpus.conditionalBelow(path)) found.add(one)
  return [...found].sort()
}
