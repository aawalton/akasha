import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const eso = {
  id: "01a0675b-16ea-77df-9153-bac46e026794",
  type: "page-type/domain",
  slug: "eso",
  definition: "how Alan plays The Elder Scrolls Online",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "eso" }],
  parts: ["domain/eso-wallpaper", "domain/the-elder-scrolls-online"],
  createdAt: "2026-09-03T13:00:18.026Z",
  updatedAt: "2026-09-24T19:32:12.000Z",
} as const satisfies Domain
