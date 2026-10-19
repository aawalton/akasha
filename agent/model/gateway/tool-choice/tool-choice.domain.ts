import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const toolChoice = {
  id: "01a15596-5ee5-7bfd-bf23-b4ddb90af6b0",
  type: "page-type/domain",
  slug: "tool-choice",
  definition: "how a request chooses the agent tool a model calls",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "tool choice" },
    { partOfSpeech: "part-of-speech/noun", spelling: "tool choices" },
  ],
  createdAt: "2026-10-19T19:14:40.484Z",
  updatedAt: "2026-10-19T19:18:42.793Z",
} as const satisfies Domain
