import { expect, test } from "bun:test"
import {
  itemsIn,
  type Lexicon,
  type Rule,
  unspelledIn,
  waysIn,
  wordsIn,
} from "akasha/domain/plain-language/standard-agent-english/modules/phrase-parsing/phrase-parsing.module.code.ts"
import { determiner } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/pages/determiner.part-of-speech.ts"
import { noun } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/pages/noun.part-of-speech.ts"
import { preposition } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/pages/preposition.part-of-speech.ts"
import { partOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.ts"
import { domainDefinition } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/pages/domain-definition.phrase-kind.ts"
import { nounGroup } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/pages/noun-group.phrase-kind.ts"
import { nounPhrase } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/pages/noun-phrase.phrase-kind.ts"
import { prepositionPhrase } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/pages/preposition-phrase.phrase-kind.ts"
import { phraseKind } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/phrase-kind.page-type.ts"

const NOUN = `${partOfSpeech.slug}/${noun.slug}`

const DETERMINER = `${partOfSpeech.slug}/${determiner.slug}`

const PREPOSITION = `${partOfSpeech.slug}/${preposition.slug}`

const NOUN_GROUP = `${phraseKind.slug}/${nounGroup.slug}`

const NOUN_PHRASE = `${phraseKind.slug}/${nounPhrase.slug}`

const PREPOSITION_PHRASE = `${phraseKind.slug}/${prepositionPhrase.slug}`

const DOMAIN_DEFINITION = `${phraseKind.slug}/${domainDefinition.slug}`

const RULES: readonly Rule[] = [
  { phraseKind: NOUN_GROUP, writtenFrom: [NOUN] },
  { phraseKind: NOUN_GROUP, writtenFrom: [NOUN, PREPOSITION_PHRASE] },
  { phraseKind: NOUN_PHRASE, writtenFrom: [NOUN_GROUP] },
  { phraseKind: NOUN_PHRASE, writtenFrom: [DETERMINER, NOUN_GROUP] },
  { phraseKind: PREPOSITION_PHRASE, writtenFrom: [PREPOSITION, NOUN_PHRASE] },
]

const STACKING: readonly Rule[] = [
  ...RULES,
  { phraseKind: NOUN_GROUP, writtenFrom: [NOUN_GROUP, PREPOSITION_PHRASE] },
]

const LEXICON: Lexicon = new Map([
  ["a", new Set([DETERMINER])],
  ["the", new Set([DETERMINER])],
  ["in", new Set([PREPOSITION])],
  ["of", new Set([PREPOSITION])],
  ["rock", new Set([NOUN])],
  ["machine", new Set([NOUN])],
  ["cluster", new Set([NOUN])],
  ["servers", new Set([NOUN])],
  ["rock cluster", new Set([NOUN])],
  ["a rock cluster machine", new Set([NOUN])],
])

test("a phrase is split on spaces and empty runs are left out", () => {
  expect(wordsIn("  a  rock ")).toEqual(["a", "rock"])
})

test("a word closing with the possessive mark is split from that mark", () => {
  expect(wordsIn("a machine's rock")).toEqual(["a", "machine", "'s", "rock"])
})

test("a word that is the possessive mark alone is left whole", () => {
  expect(wordsIn("'s")).toEqual(["'s"])
})

test("a run of words a spelling names is one item", () => {
  expect(itemsIn("a rock cluster of servers", LEXICON)).toEqual([
    "a",
    "rock cluster",
    "of",
    "servers",
  ])
})

test("the longest run a spelling names is the one taken", () => {
  expect(itemsIn("a rock cluster machine", LEXICON)).toEqual(["a rock cluster machine"])
})

test("a word no multi-word spelling reaches is an item of its own", () => {
  expect(itemsIn("a machine in a cluster", LEXICON)).toEqual(["a", "machine", "in", "a", "cluster"])
})

test("the words no spelling names are each named once, in the order the phrase says them", () => {
  expect(unspelledIn("a boulder of rock or boulder", LEXICON)).toEqual(["boulder", "or"])
})

test("a phrase whose every word is spelt has no word left unspelt", () => {
  expect(unspelledIn("a rock cluster of servers", LEXICON)).toEqual([])
})

test("a multi-word noun is one noun in a phrase", () => {
  expect(waysIn("a rock cluster", RULES, LEXICON, NOUN_PHRASE)).toBe(1)
})

test("one noun is a noun group and a noun phrase alike", () => {
  expect(waysIn("rock", RULES, LEXICON, NOUN_GROUP)).toBe(1)
  expect(waysIn("rock", RULES, LEXICON, NOUN_PHRASE)).toBe(1)
})

test("a determiner and a noun group make a noun phrase and no noun group", () => {
  expect(waysIn("a rock", RULES, LEXICON, NOUN_PHRASE)).toBe(1)
  expect(waysIn("a rock", RULES, LEXICON, NOUN_GROUP)).toBe(0)
})

test("a second determiner is refused", () => {
  expect(waysIn("the a rock", RULES, LEXICON, NOUN_PHRASE)).toBe(0)
})

test("a preposition phrase hangs on a noun", () => {
  expect(waysIn("a machine in a cluster", RULES, LEXICON, NOUN_PHRASE)).toBe(1)
})

test("a preposition phrase inside another is reached one way only", () => {
  expect(waysIn("a machine in a cluster of servers", RULES, LEXICON, NOUN_PHRASE)).toBe(1)
})

test("a word no spelling names is refused", () => {
  expect(waysIn("a boulder", RULES, LEXICON, NOUN_PHRASE)).toBe(0)
})

test("a phrase kind with no construction admits nothing", () => {
  expect(waysIn("a rock", RULES, LEXICON, DOMAIN_DEFINITION)).toBe(0)
})

test("a construction written from its own phrase kind counts two ways rather than looping", () => {
  expect(waysIn("a machine in a cluster of servers", STACKING, LEXICON, NOUN_PHRASE)).toBe(2)
})

test("the count stops at two however many ways there are", () => {
  expect(
    waysIn("a machine in a cluster of servers in a rock", STACKING, LEXICON, NOUN_PHRASE)
  ).toBe(2)
})
