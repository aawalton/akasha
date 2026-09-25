import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const romance = {
  id: "01a0673a-bc3a-7005-88bf-8400c8981697",
  type: "page-type/domain",
  slug: "romance",
  definition: "Alan's romance",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "romance" }],
} as const satisfies Domain
