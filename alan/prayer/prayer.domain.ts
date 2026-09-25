import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const prayer = {
  id: "01a0673a-bc3a-7006-887d-3f201ae6bded",
  type: "page-type/domain",
  slug: "prayer",
  definition: "Alan's prayer",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "prayer" }],
} as const satisfies Domain
