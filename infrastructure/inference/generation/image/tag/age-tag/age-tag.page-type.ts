import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const ageTag = {
  id: "01a0de87-c73f-7882-bf31-0222b36154a0",
  type: "page-type/page-type",
  slug: "age-tag",
  definition: "an age a figure in an image is drawn as",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "age tag" },
    { partOfSpeech: "part-of-speech/noun", spelling: "age tags" },
  ],
  extends: ["page-type/image-tag"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
