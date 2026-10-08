import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const mcp = {
  id: "01a065a0-1408-780c-8dcb-6f6ea9f7d7fd",
  type: "page-type/domain",
  slug: "mcp",
  definition: "how an agent calls a program",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "mcp" }],
  parts: ["domain/mcp-server"],
  createdAt: "2026-09-03T04:56:24.840Z",
  updatedAt: "2026-09-25T15:10:02.000Z",
} as const satisfies Domain
