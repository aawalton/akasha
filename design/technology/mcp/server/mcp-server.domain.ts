import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const mcpServer = {
  id: "01a0d46d-1c69-7e88-b265-f0d743ac677a",
  type: "page-type/domain",
  slug: "mcp-server",
  definition: "a program an agent calls through mcp",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "mcp server" },
    { partOfSpeech: "part-of-speech/noun", spelling: "mcp servers" },
  ],
} as const satisfies Domain
