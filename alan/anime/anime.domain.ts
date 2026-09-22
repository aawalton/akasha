import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const anime = {
  id: "01a0673a-bc3a-7001-b382-d105cf5b01d6",
  type: "page-type/domain",
  slug: "anime",
  definition: "the series and films Alan is working through",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "anime" }],
} as const satisfies Domain
