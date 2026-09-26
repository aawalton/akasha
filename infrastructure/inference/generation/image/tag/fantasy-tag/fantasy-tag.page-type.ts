import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const fantasyTag = {
  id: "01a0de87-c73f-747e-9ac4-e9357557e5b6",
  type: "page-type/page-type",
  slug: "fantasy-tag",
  definition: "a fantasy an image draws on",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "fantasy tag" },
    { partOfSpeech: "part-of-speech/noun", spelling: "fantasy tags" },
  ],
  extends: ["page-type/image-tag"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
