import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { definition } from "akasha/domain/properties/definition.standard-agent-english-property.ts"
import {
  type Lexicon,
  type Rule,
  waysIn,
} from "akasha/domain/standard-agent-english/modules/phrase-parsing/phrase-parsing.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  recordsIn,
  textAt,
  textsAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const DOMAIN_TYPE = "01a049c8-3ead-7c52-9ab6-88767954ed5f"

const CONSTRUCTION_TYPE = "01a0c57b-2a6d-776f-861f-adfa84782205"

const DEFINITION = definition.propertySlug

const SPELLINGS = "spellings"

const SPELLING = "spelling"

const PART_OF_SPEECH = "partOfSpeech"

const SCOPE = "scope"

const SLUG = "slug"

const PHRASE_KIND = "phraseKind"

const WRITTEN_FROM = "writtenFrom"

export const START = definition.startSymbol

export function ruleIn(value: Value): Rule | null {
  const phraseKind = textAt(value, PHRASE_KIND)
  const writtenFrom = textsAt(value, WRITTEN_FROM)
  if (phraseKind === null || writtenFrom === null) return null
  return { phraseKind, writtenFrom }
}

export type Spellings = {
  readonly global: Lexicon
  readonly scoped: ReadonlyMap<string, Lexicon>
}

type Held = Map<string, Set<string>>

function heldAt(scoped: Map<string, Held>, scope: string): Held {
  const already = scoped.get(scope)
  if (already !== undefined) return already
  const made: Held = new Map()
  scoped.set(scope, made)
  return made
}

export function spelledIn(value: Value, global: Held, scoped: Map<string, Held>): undefined {
  for (const one of recordsIn(value[SPELLINGS])) {
    const spelling = textAt(one, SPELLING)
    const partOfSpeech = textAt(one, PART_OF_SPEECH)
    if (spelling === null || partOfSpeech === null) continue
    const said = textAt(one, SCOPE)
    const lexicon = said === null ? global : heldAt(scoped, slugIn(said) ?? said)
    const already = lexicon.get(spelling)
    if (already === undefined) lexicon.set(spelling, new Set([partOfSpeech]))
    else already.add(partOfSpeech)
  }
  return undefined
}

export function lexiconAt(spellings: Spellings, slug: string): Lexicon {
  const reaching: Lexicon[] = []
  for (const [scope, lexicon] of spellings.scoped) {
    if (slug === scope || slug.startsWith(`${scope}-`)) reaching.push(lexicon)
  }
  if (reaching.length === 0) return spellings.global
  const found: Held = new Map()
  for (const [spelling, parts] of spellings.global) found.set(spelling, new Set(parts))
  for (const lexicon of reaching) {
    for (const [spelling, parts] of lexicon) {
      const already = found.get(spelling)
      if (already === undefined) found.set(spelling, new Set(parts))
      else for (const part of parts) already.add(part)
    }
  }
  return found
}

export function rulesIn(index: Answering): readonly Rule[] {
  const found: Rule[] = []
  const pageTypeSlug = index.typeSlugOf(CONSTRUCTION_TYPE)
  for (const [, value] of index.valuesByPath(pageTypeSlug)) {
    const rule = ruleIn(value)
    if (rule !== null) found.push(rule)
  }
  return found
}

export function lexiconIn(index: Answering): Spellings {
  const global: Held = new Map()
  const scoped = new Map<string, Held>()
  for (const pageTypeSlug of index.pageTypesIn()) {
    for (const [, value] of index.valuesByPath(pageTypeSlug)) {
      spelledIn(value, global, scoped)
    }
  }
  return { global, scoped }
}

export function whyRefused(
  phrase: string,
  rules: readonly Rule[],
  lexicon: Lexicon,
  startSymbol: string
): string | null {
  const ways = waysIn(phrase, rules, lexicon, startSymbol)
  if (ways === 1) return null
  if (ways === 0) {
    return `\`${phrase}\` is written no way the grammar admits from \`${startSymbol}\``
  }
  return `\`${phrase}\` is written more than one way from \`${startSymbol}\`, so it is ambiguous`
}

export function reasonsIn(
  path: string,
  value: Value,
  rules: readonly Rule[],
  spellings: Spellings
): readonly Judged[] {
  const phrase = textAt(value, DEFINITION)
  if (phrase === null) return []
  const lexicon = lexiconAt(spellings, textAt(value, SLUG) ?? "")
  const why = whyRefused(phrase, rules, lexicon, START)
  return why === null ? [] : [{ path, reason: why }]
}
