import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const self = {
  id: "01a06576-0000-7000-8000-000000000101",
  type: "page-type/domain",
  slug: "self",
  definition: "who Alan wants to become",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "self" }],
  parts: ["page-type/identity-statement", "page-type/life-theme"],
} as const satisfies Domain
