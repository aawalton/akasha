import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const lua = {
  id: "01a0d919-b77d-787e-bb05-6b624815a6ad",
  type: "page-type/domain",
  slug: "lua",
  definition: "a language for code a game runs",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Lua" }],
} as const satisfies Domain
