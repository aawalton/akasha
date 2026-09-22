import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const mcp = {
  id: "01a065a0-1408-780c-8dcb-6f6ea9f7d7fd",
  type: "page-type/domain",
  slug: "mcp",
  definition: "how a program adds Tools to what an agent can call",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "mcp" }],
} as const satisfies Domain
