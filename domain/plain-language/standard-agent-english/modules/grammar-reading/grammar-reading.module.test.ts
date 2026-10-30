import { expect, test } from "bun:test"
import {
  definedIn,
  lexiconAt,
  lexiconOf,
  reachedFrom,
  ruleIn,
  spelledIn,
} from "akasha/domain/plain-language/standard-agent-english/modules/grammar-reading/grammar-reading.module.code.ts"
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

const LEXICON = new Map([
  ["a", new Set([DETERMINER])],
  ["rock", new Set([NOUN])],
])

const SCOPED = {
  global: LEXICON,
  scoped: new Map([["rock-cluster", new Map([["boulder", new Set([NOUN])]])]]),
  reached: new Map([["rock-cluster", new Set(["rock-cluster", "scree"])]]),
}

const PAGES = new Map([
  ["domain/rock-cluster", { parts: ["module/scree", "domain/gravel"] }],
  ["domain/gravel", { parts: ["module/grit"] }],
  ["module/grit", { parts: ["domain/rock-cluster"] }],
])

function pageAt(pageTypeSlug: string, slug: string): { parts: string[] } | null {
  return PAGES.get(`${pageTypeSlug}/${slug}`) ?? null
}

test("a construction is read as a rule, and a page missing either half is left out", () => {
  expect(ruleIn({ phraseKind: NOUN_PHRASE, writtenFrom: [NOUN_GROUP] })).toEqual({
    phraseKind: NOUN_PHRASE,
    writtenFrom: [NOUN_GROUP],
  })
  expect(ruleIn({ phraseKind: NOUN_PHRASE })).toBeNull()
  expect(ruleIn({ writtenFrom: [NOUN_GROUP] })).toBeNull()
})

test("a page's spellings are gathered under the words they spell", () => {
  const global = new Map<string, Set<string>>()
  const scoped = new Map<string, Map<string, Set<string>>>()
  spelledIn({ spellings: [{ partOfSpeech: NOUN, spelling: "rock" }] }, global, scoped)
  spelledIn({ spellings: [{ partOfSpeech: DETERMINER, spelling: "rock" }] }, global, scoped)
  spelledIn({ spellings: "not a list" }, global, scoped)
  expect(global.get("rock")).toEqual(new Set([NOUN, DETERMINER]))
  expect(scoped.size).toBe(0)
})

test("a spelling stating a scope is gathered under that scope rather than the global words", () => {
  const global = new Map<string, Set<string>>()
  const scoped = new Map<string, Map<string, Set<string>>>()
  const spellings = [{ partOfSpeech: NOUN, spelling: "boulder", scope: "domain/rock-cluster" }]
  spelledIn({ spellings }, global, scoped)
  expect(global.has("boulder")).toBe(false)
  expect(scoped.get("rock-cluster")?.get("boulder")).toEqual(new Set([NOUN]))
})

test("a scoped word is read on the pages its scope reaches and nowhere else", () => {
  expect(lexiconAt(SCOPED, "rock-cluster").has("boulder")).toBe(true)
  expect(lexiconAt(SCOPED, "rock-cluster-machine").has("boulder")).toBe(true)
  expect(lexiconAt(SCOPED, "rock-clustering").has("boulder")).toBe(false)
  expect(lexiconAt(SCOPED, "rock").has("boulder")).toBe(false)
})

test("a scoped word is read on a page beneath its scope in the parts", () => {
  expect(lexiconAt(SCOPED, "scree").has("boulder")).toBe(true)
  expect(lexiconAt(SCOPED, "sand").has("boulder")).toBe(false)
})

test("a scope reaches its own page and every page its parts name, however far", () => {
  expect(reachedFrom("domain/rock-cluster", pageAt)).toEqual(
    new Set(["rock-cluster", "scree", "gravel", "grit"])
  )
  expect(reachedFrom("domain/gravel", pageAt)).toEqual(
    new Set(["gravel", "grit", "rock-cluster", "scree"])
  )
  expect(reachedFrom("module/scree", pageAt)).toEqual(new Set(["scree"]))
})

test("the words read every scope's reach from the pages beneath it", () => {
  const spellings = [{ partOfSpeech: NOUN, spelling: "boulder", scope: "domain/gravel" }]
  const read = lexiconOf([{ spellings }], pageAt)
  expect(lexiconAt(read, "grit").has("boulder")).toBe(true)
  expect(lexiconAt(read, "sand").has("boulder")).toBe(false)
})

test("a page no scope reaches is handed the global words alone", () => {
  expect(lexiconAt(SCOPED, "rock")).toBe(LEXICON)
})

test("a scoped word is read beside the global words rather than in place of them", () => {
  const found = lexiconAt(SCOPED, "rock-cluster")
  expect(found.get("rock")).toEqual(new Set([NOUN]))
  expect(found.get("boulder")).toEqual(new Set([NOUN]))
})

test("a page stating a definition is read as its path, its slug and that definition", () => {
  expect(definedIn("rock.domain.ts", { slug: "rock", definition: "a rock" })).toEqual({
    path: "rock.domain.ts",
    slug: "rock",
    definition: "a rock",
  })
})

test("a page stating no definition or an empty one is left out", () => {
  expect(definedIn("rock.domain.ts", { slug: "rock" })).toBeNull()
  expect(definedIn("rock.domain.ts", { slug: "rock", definition: "" })).toBeNull()
})
