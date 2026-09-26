import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const ethnicityTag = {
  id: "01a0de87-c73f-7095-8002-812ea0142cf0",
  type: "page-type/page-type",
  slug: "ethnicity-tag",
  definition: "an ethnicity a figure in an image is drawn as",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "ethnicity tag" },
    { partOfSpeech: "part-of-speech/noun", spelling: "ethnicity tags" },
  ],
  extends: ["page-type/image-tag"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
