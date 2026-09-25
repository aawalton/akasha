import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  lexiconAt,
  type Spellings,
  START,
} from "akasha/domain/plain-language/standard-agent-english/modules/grammar-reading/grammar-reading.module.code.ts"
import {
  type Lexicon,
  type Rule,
  waysIn,
} from "akasha/domain/plain-language/standard-agent-english/modules/phrase-parsing/phrase-parsing.module.code.ts"
import { definition } from "akasha/domain/properties/definition.standard-agent-english-property.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const DEFINITION = definition.propertySlug

const SLUG = "slug"

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
