import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  grammarWords,
  partsLine,
} from "akasha/command/pages/grammar/words/grammar-words.command.code.ts"
import { determiner } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/pages/determiner.part-of-speech.ts"
import { noun } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/pages/noun.part-of-speech.ts"
import { partOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.ts"

const CALLED_AS = "akasha grammar words"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const NOUN = `${partOfSpeech.slug}/${noun.slug}`

const DETERMINER = `${partOfSpeech.slug}/${determiner.slug}`

const LEXICON = new Map([
  ["a", new Set([DETERMINER])],
  ["rock", new Set([NOUN, DETERMINER])],
])

test("a word is said with its parts of speech in the order of their slugs", () => {
  expect(partsLine("rock", LEXICON)).toBe("rock: determiner, noun")
})

test("a word the lexicon has no spelling for is said to have none", () => {
  expect(partsLine("boulder", LEXICON)).toBe("boulder: none")
})

test("a call naming no scope is refused", () => {
  const answer = grammarWords(["rock"], GIVEN)
  expect(answer.refusals.join("\n")).toContain("--scope")
})

test("a call naming no word is refused", () => {
  const answer = grammarWords(["--scope", "rock"], GIVEN)
  expect(answer.refusals.join("\n")).toContain("<word>")
})
