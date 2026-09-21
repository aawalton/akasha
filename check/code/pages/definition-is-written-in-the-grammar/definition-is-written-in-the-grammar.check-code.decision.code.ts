import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { definition } from "akasha/domain/properties/definition.standard-agent-english-property.ts"
import {
  type Lexicon,
  type Rule,
  waysIn,
} from "akasha/domain/standard-agent-english/modules/phrase-parsing/phrase-parsing.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import {
  recordsIn,
  textAt,
  textsAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const DOMAIN_TYPE = "01a049c8-3ead-7c52-9ab6-88767954ed5f"

export const CONSTRUCTION_TYPE = "01a0c57b-2a6d-776f-861f-adfa84782205"

const DEFINITION = definition.propertySlug

const SPELLINGS = "spellings"

const SPELLING = "spelling"

const PART_OF_SPEECH = "partOfSpeech"

const PHRASE_KIND = "phraseKind"

const WRITTEN_FROM = "writtenFrom"

export const START = definition.startSymbol

export function ruleIn(value: Value): Rule | null {
  const phraseKind = textAt(value, PHRASE_KIND)
  const writtenFrom = textsAt(value, WRITTEN_FROM)
  if (phraseKind === null || writtenFrom === null) return null
  return { phraseKind, writtenFrom }
}

export function spelledIn(value: Value, lexicon: Map<string, Set<string>>): undefined {
  for (const one of recordsIn(value[SPELLINGS])) {
    const spelling = textAt(one, SPELLING)
    const partOfSpeech = textAt(one, PART_OF_SPEECH)
    if (spelling === null || partOfSpeech === null) continue
    const already = lexicon.get(spelling)
    if (already === undefined) lexicon.set(spelling, new Set([partOfSpeech]))
    else already.add(partOfSpeech)
  }
  return undefined
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

export function lexiconIn(index: Answering): Lexicon {
  const lexicon = new Map<string, Set<string>>()
  for (const pageTypeSlug of index.pageTypesIn()) {
    for (const [, value] of index.valuesByPath(pageTypeSlug)) spelledIn(value, lexicon)
  }
  return lexicon
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
  lexicon: Lexicon
): readonly Judged[] {
  const phrase = textAt(value, DEFINITION)
  if (phrase === null) return []
  const why = whyRefused(phrase, rules, lexicon, START)
  return why === null ? [] : [{ path, reason: why }]
}
