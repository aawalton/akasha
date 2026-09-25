import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  addedIn,
  constructionsIn,
  grammarTry,
  type Kinds,
  shiftLines,
  shiftsIn,
  spellingsWith,
  waysSaid,
  wordingLines,
} from "akasha/command/pages/grammar/try/grammar-try.command.code.ts"
import { determiner } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/pages/determiner.part-of-speech.ts"
import { noun } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/pages/noun.part-of-speech.ts"
import { partOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.ts"
import { domainDefinition } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/pages/domain-definition.phrase-kind.ts"
import { nounPhrase } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/pages/noun-phrase.phrase-kind.ts"
import { phraseKind } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/phrase-kind.page-type.ts"

const CALLED_AS = "akasha grammar try"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const NOUN = `${partOfSpeech.slug}/${noun.slug}`

const DETERMINER = `${partOfSpeech.slug}/${determiner.slug}`

const NOUN_PHRASE = `${phraseKind.slug}/${nounPhrase.slug}`

const START = `${phraseKind.slug}/${domainDefinition.slug}`

const KINDS: Kinds = {
  parts: new Set([noun.slug, determiner.slug]),
  kinds: new Set([nounPhrase.slug, domainDefinition.slug]),
}

const RULES = [{ phraseKind: START, writtenFrom: [DETERMINER, NOUN] }]

const LEXICON = new Map([
  ["a", new Set([DETERMINER])],
  ["rock", new Set([NOUN])],
])

const SPELLINGS = { global: LEXICON, scoped: new Map() }

const ROCK = { path: "rock/rock.domain.ts", slug: "rock", definition: "a rock" }

const BOULDER = { path: "rock/boulder.domain.ts", slug: "boulder", definition: "a boulder" }

test("a word tried is read as its spelling and the part of speech after its last colon", () => {
  expect(addedIn(["boulder:noun"], KINDS.parts)).toEqual({
    read: [{ spelling: "boulder", partOfSpeech: NOUN }],
    refused: [],
  })
})

test("a word tried with no colon or with a part of speech no page has is refused", () => {
  expect(addedIn(["boulder"], KINDS.parts).refused[0]).toContain("parted by a colon")
  expect(addedIn(["boulder:rocky"], KINDS.parts).refused[0]).toContain("`rocky` is no part")
})

test("a construction tried is read as its phrase kind and each item after the equals sign", () => {
  expect(constructionsIn(["noun-phrase=determiner,noun-phrase"], KINDS)).toEqual({
    read: [{ phraseKind: NOUN_PHRASE, writtenFrom: [DETERMINER, NOUN_PHRASE] }],
    refused: [],
  })
})

test("a construction tried with no equals sign or an unknown item is refused", () => {
  expect(constructionsIn(["noun-phrase"], KINDS).refused[0]).toContain("equals sign")
  expect(constructionsIn(["rocky=noun"], KINDS).refused[0]).toContain("`rocky` is no phrase kind")
  expect(constructionsIn(["noun-phrase=pebble"], KINDS).refused[0]).toContain("`pebble`")
})

test("a word tried is put in beside the words already spelt", () => {
  const found = spellingsWith(SPELLINGS, [{ spelling: "rock", partOfSpeech: DETERMINER }])
  expect(found.global.get("rock")).toEqual(new Set([NOUN, DETERMINER]))
  expect(LEXICON.get("rock")).toEqual(new Set([NOUN]))
})

test("two ways or more are said as more than one", () => {
  expect(waysSaid(0)).toBe("0")
  expect(waysSaid(1)).toBe("1")
  expect(waysSaid(2)).toBe("more than one")
})

test("a wording is said with its ways and its unspelt words", () => {
  expect(wordingLines("a boulder", LEXICON, RULES)).toEqual([
    "a boulder",
    "  ways: 0",
    "  not in the lexicon: boulder",
  ])
})

test("a definition written one way only after the trial is gained, and the reverse lost", () => {
  const after = {
    rules: RULES,
    spellings: spellingsWith(SPELLINGS, [{ spelling: "boulder", partOfSpeech: NOUN }]),
  }
  const shifts = shiftsIn([ROCK, BOULDER], { rules: RULES, spellings: SPELLINGS }, after)
  expect(shifts).toEqual({ gained: [BOULDER], lost: [] })
  expect(shiftsIn([ROCK, BOULDER], after, { rules: RULES, spellings: SPELLINGS })).toEqual({
    gained: [],
    lost: [BOULDER],
  })
})

test("each definition gained or lost is said with its path and text, and the counts follow", () => {
  expect(shiftLines({ gained: [BOULDER], lost: [ROCK] })).toEqual([
    "gains rock/boulder.domain.ts: a boulder",
    "loses rock/rock.domain.ts: a rock",
    "gained 1, lost 1",
  ])
})

test("a call trying nothing and naming no wording is refused", () => {
  const answer = grammarTry(["--scope", "rock"], GIVEN)
  expect(answer.refusals.join("\n")).toContain("nothing said")
})
