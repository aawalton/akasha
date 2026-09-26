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
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
