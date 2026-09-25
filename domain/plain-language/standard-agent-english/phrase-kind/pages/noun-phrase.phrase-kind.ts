import type { PhraseKind } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/phrase-kind.page-type.types.ts"

export const nounPhrase = {
  id: "01a0c576-3eef-7c2e-a1bd-96878f0bd22f",
  type: "page-type/phrase-kind",
  slug: "noun-phrase",
  definition: "a phrase naming a thing, written from a noun",
} as const satisfies PhraseKind
