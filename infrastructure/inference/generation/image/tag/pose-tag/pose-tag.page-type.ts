import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const poseTag = {
  id: "01a0de87-c740-79ad-98b1-cdaffc15183a",
  type: "page-type/page-type",
  slug: "pose-tag",
  definition: "a way a figure in an image is posed",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "pose tag" },
    { partOfSpeech: "part-of-speech/noun", spelling: "pose tags" },
  ],
  extends: ["page-type/image-tag"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
