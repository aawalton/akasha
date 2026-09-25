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
import { told } from "akasha/git/modules/running/git-running.module.code.ts"
import { pageTypesIn } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  everyOfType,
  readingIn,
  slugsOfType,
  typeSlugOf,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { INDEX_AT } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  recordsIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"

const PAGE_TYPE = "page-type"

const SPELLINGS = "spellings"

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

type Valued = readonly [string, Page, Value]

type Round = {
  readonly commit: string
  readonly reading: Reading
  readonly whole: boolean
  readonly seen: Set<string>
  pruned: boolean
}

type Inputs = {
  readonly rules: readonly Rule[]
  readonly spellings: Spellings
  readonly kinds: ReadonlySet<string>
  readonly said: string
}

const INDEXED = `${INDEX_AT}/`

const TYPE_LISTS = ["page-type", "page-property"]

const EVERY_TYPE = ""

function typeListedAt(path: string): string | null {
  const [top, pageTypeSlug] = path.slice(INDEXED.length).split("/")
  if (top === undefined || !TYPE_LISTS.includes(top)) return null
  return pageTypeSlug ?? EVERY_TYPE
}

function statesSpellings(value: Value | null): boolean {
  return value !== null && recordsIn(value[SPELLINGS]).length > 0
}

export function holdingOver(root: string, commitOf: () => string): Holding {
  const held = new Map<string, Page>()
  const listed = new Map<string, readonly string[]>()
  let inputs: Inputs | null = null
  let inputsMoved = true
  let round: Round | null = null

  const changedBetween = (from: string, to: string): readonly string[] | null => {
    if (from === "" || to === "") return null
    if (told(root, ["merge-base", "--is-ancestor", from, to]) === null) return null
    const said = told(root, ["diff", "--name-only", "--no-renames", "-z", from, to])
    return said === null ? null : said.split("\0").filter((one) => one !== "")
  }

  const readAt = (reading: Reading, path: string): Page | null => {
    const body = reading.read(path)
    if (body === null) return null
    return { hash: hashOf(body), value: valueByPath(reading, path), gaps: null, refused: null }
  }

  const moves = (reading: Reading, path: string, value: Value | null): boolean => {
    const pageType = partedIn(path)?.pageType
    if (pageType === PAGE_TYPE || pageType === typeSlugOf(reading, CONSTRUCTION_TYPE)) return true
    return statesSpellings(value)
  }

  const takeChanged = (reading: Reading, changed: readonly string[]): undefined => {
    for (const path of changed) {
      if (path.startsWith(INDEXED)) {
        const pageType = typeListedAt(path)
        if (pageType === EVERY_TYPE) listed.clear()
        else if (pageType !== null) listed.delete(pageType)
        continue
      }
      const was = held.get(path)
      const now = readAt(reading, path)
      if (moves(reading, path, was?.value ?? null) || moves(reading, path, now?.value ?? null)) {
        inputsMoved = true
      }
      if (now === null) held.delete(path)
      else held.set(path, now)
    }
    return undefined
  }

  const roundNow = (): Round => {
    const commit = commitOf()
    if (round !== null && round.commit === commit) return round
    const reading = readingIn(root)
    const changed = round === null ? null : changedBetween(round.commit, commit)
    if (changed === null) {
      listed.clear()
      inputsMoved = true
    } else {
      takeChanged(reading, changed)
    }
    round = { commit, reading, whole: changed === null, seen: new Set(), pruned: false }
    return round
  }

  const pageIn = (at: Round, path: string): Page | null => {
    const prior = held.get(path)
    if (!at.whole || at.seen.has(path)) return prior ?? null
    at.seen.add(path)
    const now = readAt(at.reading, path)
    if (now === null) {
      held.delete(path)
      return null
    }
    if (prior !== undefined && prior.hash === now.hash) return prior
    held.set(path, now)
    return now
  }

  const pathsOf = (at: Round, pageTypeSlug: string): readonly string[] => {
    const already = listed.get(pageTypeSlug)
    if (already !== undefined) return already
    const made = everyOfType(at.reading, pageTypeSlug).map((one) => one.path)
    listed.set(pageTypeSlug, made)
    return made
  }

  const valuesOf = (at: Round, pageTypeSlug: string): readonly Valued[] =>
    pathsOf(at, pageTypeSlug).flatMap((path): Valued[] => {
      const page = pageIn(at, path) ?? (at.whole ? null : readTaken(at, path))
      return page === null || page.value === null ? [] : [[path, page, page.value]]
    })

  const readTaken = (at: Round, path: string): Page | null => {
    const now = readAt(at.reading, path)
    if (now !== null) held.set(path, now)
    return now
  }

  const inputsNow = (at: Round): Inputs => {
    if (inputs !== null && !inputsMoved) return inputs
    const every = [...pageTypesIn(at.reading)].flatMap((one) => valuesOf(at, one))
    if (at.whole && !at.pruned) {
      for (const path of [...held.keys()]) if (!at.seen.has(path)) held.delete(path)
      at.pruned = true
    }
    const rules = rulesOf(
      valuesOf(at, typeSlugOf(at.reading, CONSTRUCTION_TYPE)).map((one) => one[2])
    )
    const spellings = lexiconOf(every.map((one) => one[2]))
    const kinds = kindsUnder(typeSlugOf(at.reading, DOMAIN_TYPE), at.reading)
    const said = inputsSaid(rules, spellings, kinds)
    if (inputs === null || said !== inputs.said) {
      for (const page of held.values()) page.refused = null
    }
    inputs = { rules, spellings, kinds, said }
    inputsMoved = false
    return inputs
  }

  const refused = (): readonly Judged[] => {
    const at = roundNow()
    const { rules, spellings, kinds } = inputsNow(at)
    const found: Judged[] = []
    for (const kind of kinds) {
      for (const [path, page, value] of valuesOf(at, kind)) {
        page.refused ??= reasonsIn(path, value, rules, spellings)
        found.push(...page.refused)
      }
    }
    return found
  }

  const gaps = (): Gaps => {
    const at = roundNow()
    const pages = new Map<string, readonly [Page, Value]>()
    for (const pageTypeSlug of slugsOfType(at.reading, PAGE_TYPE)) {
      for (const [path, page, value] of valuesOf(at, pageTypeSlug)) {
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
