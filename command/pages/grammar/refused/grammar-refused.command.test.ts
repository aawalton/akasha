import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  grammarRefused,
  isWithin,
  refusalLines,
  refusedIn,
  totalsLine,
} from "akasha/command/pages/grammar/refused/grammar-refused.command.code.ts"
import { determiner } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/pages/determiner.part-of-speech.ts"
import { noun } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/pages/noun.part-of-speech.ts"
import { partOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.ts"
import { domainDefinition } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/pages/domain-definition.phrase-kind.ts"
import { phraseKind } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/phrase-kind.page-type.ts"
import { definition } from "akasha/domain/properties/definition.standard-agent-english-property.ts"

const CALLED_AS = "akasha grammar refused"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const NOUN = `${partOfSpeech.slug}/${noun.slug}`

const DETERMINER = `${partOfSpeech.slug}/${determiner.slug}`

const START = `${phraseKind.slug}/${domainDefinition.slug}`

const RULES = [{ phraseKind: START, writtenFrom: [DETERMINER, NOUN] }]

const LEXICON = new Map([
  ["a", new Set([DETERMINER])],
  ["rock", new Set([NOUN])],
])

const SPELLINGS = { global: LEXICON, scoped: new Map() }

const ROCK = { path: "rock/rock.domain.ts", slug: "rock", definition: "a rock" }

const BOULDER = { path: "rock/boulder.domain.ts", slug: "boulder", definition: "a big boulder" }

test("the start the grammar parses a definition from is the definition property's own", () => {
  expect(START).toBe(definition.startSymbol)
})

test("every path is within where no opening is said", () => {
  expect(isWithin("rock/rock.domain.ts", [])).toBe(true)
})

test("a path is within where it opens with one of the openings said", () => {
  expect(isWithin("rock/rock.domain.ts", ["stone/", "rock/"])).toBe(true)
  expect(isWithin("rock/rock.domain.ts", ["stone/"])).toBe(false)
})

test("a definition the grammar writes one way is admitted and one it writes no way is refused", () => {
  expect(refusedIn([ROCK, BOULDER], RULES, SPELLINGS)).toEqual([BOULDER])
})

test("the first line counts the definitions, the admitted and the refused", () => {
  expect(totalsLine(10, 7)).toBe("definitions 10, admitted 3, refused 7")
})

test("a refused definition is listed with its path, its text and its unspelt words", () => {
  expect(refusalLines(BOULDER, ["big", "boulder"])).toEqual([
    "rock/boulder.domain.ts",
    "  a big boulder",
    "  not in the lexicon: big boulder",
  ])
})

test("a refused definition with every word spelt says none is missing", () => {
  expect(refusalLines(ROCK, [])[2]).toBe("  not in the lexicon: none")
})

test("a call saying both how many to list and to list them all is refused", () => {
  const answer = grammarRefused(["--all", "--first", "3"], GIVEN)
  expect(answer.refusals.join("\n")).toContain("never said together")
})

test("a count that is no whole number is refused", () => {
  const answer = grammarRefused(["--first", "some"], GIVEN)
  expect(answer.refusals.join("\n")).toContain("no whole number")
})
