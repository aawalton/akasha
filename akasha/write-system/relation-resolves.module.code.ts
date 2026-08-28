import type { Corpus, Standing } from "./corpus.module.code.ts"

type PropertyType = {
  readonly slug: string
  readonly kind: string
  readonly targetPageTypeSlug: string | null
  readonly entrySlug: string | null
}

const NOT_A_PROPERTY = new Set(["id", "slug", "pageTypeSlug"])

function kebab(key: string): string {
  return key.replace(/[A-Z]/g, (one) => `-${one.toLowerCase()}`)
}

function textAt(value: Record<string, unknown>, key: string): string | null {
  const held = value[key]
  return typeof held === "string" ? held : null
}

export function vocabularyIn(corpus: Corpus): ReadonlyMap<string, PropertyType> {
  const found = new Map<string, PropertyType>()
  for (const one of corpus.every()) {
    if (one.pageTypeSlug !== "page-property-type") continue
    const value = corpus.valueOf(one.slug)
    if (value === null) continue
    const kind = textAt(value, "kind")
    if (kind === null) continue
    found.set(one.slug, {
      slug: one.slug,
      kind,
      targetPageTypeSlug: textAt(value, "targetPageTypeSlug"),
      entrySlug: textAt(value, "entrySlug"),
    })
  }
  return found
}

function targetOf(
  property: PropertyType,
  vocabulary: ReadonlyMap<string, PropertyType>
): string | null {
  if (property.kind === "relation") return property.targetPageTypeSlug
  if (property.kind !== "list" || property.entrySlug === null) return null
  const entry = vocabulary.get(property.entrySlug)
  return entry === undefined ? null : targetOf(entry, vocabulary)
}

function admits(actual: string, wanted: string, corpus: Corpus): boolean {
  const walked = new Set<string>()
  let here: string | null = actual
  while (here !== null && !walked.has(here)) {
    if (here === wanted) return true
    walked.add(here)
    const value = corpus.valueOf(here)
    const above = value === null ? null : value["extendsSlug"]
    here = typeof above === "string" ? above : null
  }
  return false
}

function namesIn(held: unknown): readonly string[] {
  if (typeof held === "string") return [held]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

export function relationRefusals(corpus: Corpus): readonly string[] {
  const vocabulary = vocabularyIn(corpus)
  const said: string[] = []
  const seen = (at: Standing, key: string, named: string, wanted: string): void => {
    const stands = corpus.at(named)
    if (stands === null) {
      said.push(
        `${at.path}: \`${key}\` names \`${named}\`, and no page carries that slug`
      )
      return
    }
    if (!admits(stands.pageTypeSlug, wanted, corpus)) {
      said.push(
        `${at.path}: \`${key}\` may name a \`${wanted}\`, and \`${named}\` is a ` +
          `\`${stands.pageTypeSlug}\``
      )
    }
  }

  for (const at of corpus.every()) {
    const value = corpus.valueOf(at.slug)
    if (value === null) continue
    for (const [key, held] of Object.entries(value)) {
      if (NOT_A_PROPERTY.has(key) || held === null) continue
      const property = vocabulary.get(kebab(key))
      if (property === undefined) continue
      const wanted = targetOf(property, vocabulary)
      if (wanted === null) continue
      for (const named of namesIn(held)) seen(at, key, named, wanted)
    }
  }
  return said
}
