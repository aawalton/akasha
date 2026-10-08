import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const mathematics = {
  id: "01a06576-0000-7000-8000-000000000102",
  type: "page-type/domain",
  slug: "mathematics",
  definition: "Alan's mathematics",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "mathematics" }],
  parts: ["page-type/proof", "page-type/proposition"],
  createdAt: "2026-09-03T04:10:27.200Z",
  updatedAt: "2026-09-25T13:23:29.000Z",
} as const satisfies Domain
