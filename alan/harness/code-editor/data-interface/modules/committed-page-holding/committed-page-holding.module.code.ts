import { gapsOn } from "akasha/alan/harness/code-editor/data-interface/modules/gap-tree-assemble/gap-tree-assemble.module.code.ts"
import { reasonsIn } from "akasha/check/code/pages/definition-is-written-in-the-grammar/definition-is-written-in-the-grammar.check-code.decision.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  CONSTRUCTION_TYPE,
  DOMAIN_TYPE,
  lexiconOf,
  rulesOf,
  type Spellings,
} from "akasha/domain/plain-language/standard-agent-english/modules/grammar-reading/grammar-reading.module.code.ts"
import type { Rule } from "akasha/domain/plain-language/standard-agent-english/modules/phrase-parsing/phrase-parsing.module.code.ts"
import { pageTypesIn } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  everyOfType,
  readingIn,
  slugsOfType,
  typeSlugOf,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"

const PAGE_TYPE = "page-type"

type Gaps = ReturnType<typeof gapsOn>

type Page = {
  readonly hash: string
  readonly value: Value | null
  gaps: Gaps | null
  refused: readonly Judged[] | null
}

export type Holding = {
  readonly refused: () => readonly Judged[]
  readonly gaps: () => Gaps
}

function hashOf(body: string | null): string {
  return body === null ? "" : Bun.hash(body).toString(16)
}

function sorted<T>(items: Iterable<T>, keyOf: (one: T) => string): readonly T[] {
  return [...items].sort((one, two) =>
    keyOf(one) < keyOf(two) ? -1 : keyOf(one) > keyOf(two) ? 1 : 0
  )
}

function spelledSaid(spellings: Spellings): string {
  const lexicon = (held: ReadonlyMap<string, ReadonlySet<string>>): readonly unknown[] =>
    sorted(held, ([spelling]) => spelling).map(([spelling, parts]) => [spelling, [...parts].sort()])
  const scoped = sorted(spellings.scoped, ([scope]) => scope).map(([scope, held]) => [
    scope,
    lexicon(held),
  ])
  return JSON.stringify([lexicon(spellings.global), scoped])
}

function inputsSaid(
  rules: readonly Rule[],
  spellings: Spellings,
  kinds: ReadonlySet<string>
): string {
  return JSON.stringify([rules, spelledSaid(spellings), [...kinds].sort()])
}

export function holdingOver(root: string): Holding {
  const held = new Map<string, Page>()
  let judgedWith: string | null = null

  const pageIn = (reading: Reading, seen: Map<string, Page>, path: string): Page => {
    const already = seen.get(path)
    if (already !== undefined) return already
    const hash = hashOf(reading.read(path))
    const prior = held.get(path)
    const page =
      prior !== undefined && prior.hash === hash
        ? prior
        : { hash, value: valueByPath(reading, path), gaps: null, refused: null }
    held.set(path, page)
    seen.set(path, page)
    return page
  }

  const valuesOf = (reading: Reading, seen: Map<string, Page>, pageTypeSlug: string) =>
    everyOfType(reading, pageTypeSlug).flatMap((one) => {
      const page = pageIn(reading, seen, one.path)
      return page.value === null ? [] : [[one.path, page, page.value] as const]
    })

  const refused = (): readonly Judged[] => {
    const reading = readingIn(root)
    const seen = new Map<string, Page>()
    const every = [...pageTypesIn(reading)].flatMap((one) => valuesOf(reading, seen, one))
    for (const path of [...held.keys()]) if (!seen.has(path)) held.delete(path)
    const rules = rulesOf(
      valuesOf(reading, seen, typeSlugOf(reading, CONSTRUCTION_TYPE)).map((one) => one[2])
    )
    const spellings = lexiconOf(every.map((one) => one[2]))
    const kinds = kindsUnder(typeSlugOf(reading, DOMAIN_TYPE), reading)
    const said = inputsSaid(rules, spellings, kinds)
    if (said !== judgedWith) {
      for (const page of held.values()) page.refused = null
      judgedWith = said
    }
    const found: Judged[] = []
    for (const kind of kinds) {
      for (const [path, page, value] of valuesOf(reading, seen, kind)) {
        page.refused ??= reasonsIn(path, value, rules, spellings)
        found.push(...page.refused)
      }
    }
    return found
  }

  const gaps = (): Gaps => {
    const reading = readingIn(root)
    const seen = new Map<string, Page>()
    const pages = new Map<string, readonly [Page, Value]>()
    for (const pageTypeSlug of slugsOfType(reading, PAGE_TYPE)) {
      for (const [path, page, value] of valuesOf(reading, seen, pageTypeSlug)) {
        pages.set(path, [page, value])
      }
    }
    const found: Gaps[number][] = []
    for (const [path, [page, value]] of pages) {
      page.gaps ??= gapsOn(path, value)
      found.push(...page.gaps)
    }
    return found
  }

  return { refused, gaps }
}
