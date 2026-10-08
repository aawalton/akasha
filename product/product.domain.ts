import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const product = {
  id: "01a0826b-97bb-7e70-8730-ba2745b92e2b",
  type: "page-type/domain",
  slug: "product",
  definition: "what Alan makes for people outside akasha",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "product" },
    { partOfSpeech: "part-of-speech/noun", spelling: "products" },
  ],
  parts: [
    "domain/archive-of-worlds",
    "domain/audhdalan",
    "domain/kofi",
    "domain/product-game",
    "domain/smilingjenny",
    "domain/wandering-inn-wiki",
  ],
  createdAt: "2026-09-08T19:08:04.411Z",
  updatedAt: "2026-09-22T14:33:10.000Z",
} as const satisfies Domain
