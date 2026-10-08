import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const kindling = {
  id: "01a0de58-8f8e-71ce-a84d-60383cecae28",
  type: "page-type/page-type",
  slug: "kindling",
  definition: "a thing that makes a person fall in love",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "kindling" },
    { partOfSpeech: "part-of-speech/noun", spelling: "kindlings" },
  ],
  extends: ["page-type/domain"],
  parts: [
    "kindling/familiarity",
    "kindling/beauty",
    "kindling/similarity",
    "kindling/reciprocity",
    "kindling/excitement",
    "kindling/idealization",
    "kindling/uncertainty",
    "kindling/knowing",
    "kindling/being-known",
    "kindling/self-expansion",
    "kindling/attachment",
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-26T15:32:21.006Z",
  updatedAt: "2026-09-26T15:37:28.000Z",
} as const satisfies PageType
