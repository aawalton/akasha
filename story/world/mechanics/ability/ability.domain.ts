import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const ability = {
  id: "01a0675b-16d3-7c80-b453-27e91b39430f",
  type: "page-type/domain",
  slug: "ability",
  definition: "something a character can do",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "ability" },
    { partOfSpeech: "part-of-speech/noun", spelling: "abilities" },
  ],
  createdAt: "2026-09-03T13:00:18.003Z",
  updatedAt: "2026-09-22T00:11:08.000Z",
} as const satisfies Domain
