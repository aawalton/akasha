import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const kubernetes = {
  id: "01a0d962-8282-748b-9f5a-aff49b9c6b98",
  type: "page-type/domain",
  slug: "kubernetes",
  definition: "a program that runs services on a set of machines",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Kubernetes" }],
} as const satisfies Domain
