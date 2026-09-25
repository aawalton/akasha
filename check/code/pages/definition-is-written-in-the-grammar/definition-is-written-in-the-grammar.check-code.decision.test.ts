import { expect, test } from "bun:test"
import {
  reasonsIn,
  whyRefused,
} from "akasha/check/code/pages/definition-is-written-in-the-grammar/definition-is-written-in-the-grammar.check-code.decision.code.ts"
import { START } from "akasha/domain/plain-language/standard-agent-english/modules/grammar-reading/grammar-reading.module.code.ts"
import { determiner } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/pages/determiner.part-of-speech.ts"
import { noun } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/pages/noun.part-of-speech.ts"
import { partOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.ts"
import { nounGroup } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/pages/noun-group.phrase-kind.ts"
import { nounPhrase } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/pages/noun-phrase.phrase-kind.ts"
import { phraseKind } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/phrase-kind.page-type.ts"

const NOUN = `${partOfSpeech.slug}/${noun.slug}`

const DETERMINER = `${partOfSpeech.slug}/${determiner.slug}`

const NOUN_GROUP = `${phraseKind.slug}/${nounGroup.slug}`

const NOUN_PHRASE = `${phraseKind.slug}/${nounPhrase.slug}`

const RULES = [
  { phraseKind: NOUN_GROUP, writtenFrom: [NOUN] },
  { phraseKind: NOUN_PHRASE, writtenFrom: [NOUN_GROUP] },
  { phraseKind: NOUN_PHRASE, writtenFrom: [DETERMINER, NOUN_GROUP] },
]

const LEXICON = new Map([
  ["a", new Set([DETERMINER])],
  ["rock", new Set([NOUN])],
])

const SPELLINGS = { global: LEXICON, scoped: new Map() }

test("a phrase written one way is let through", () => {
  expect(whyRefused("a rock", RULES, LEXICON, NOUN_PHRASE)).toBeNull()
})

test("a phrase written no way says so", () => {
  expect(whyRefused("a boulder", RULES, LEXICON, NOUN_PHRASE)).toContain("no way")
})

test("a phrase written more than one way is refused as ambiguous", () => {
  const stacking = [...RULES, { phraseKind: NOUN_PHRASE, writtenFrom: [DETERMINER, NOUN_PHRASE] }]
  const lexicon = new Map([
    ["a", new Set([DETERMINER])],
    ["rock", new Set([NOUN, DETERMINER])],
  ])
  expect(whyRefused("a rock rock", stacking, lexicon, NOUN_PHRASE)).toContain("more than one way")
})

test("a page stating no definition is judged nothing", () => {
  expect(reasonsIn("somewhere.ts", {}, RULES, SPELLINGS)).toEqual([])
})

test("a definition is judged from the phrase kind the definition property names", () => {
  const said = reasonsIn("somewhere.ts", { definition: "a rock" }, RULES, SPELLINGS)
  expect(said).toHaveLength(1)
  expect(said[0]?.reason ?? "").toContain(START)
})
