import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const wardrobeTag = {
  id: "01a0de87-c740-78a9-9460-ff8b7e4bdabe",
  type: "page-type/page-type",
  slug: "wardrobe-tag",
  definition: "something a figure in an image wears",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "wardrobe tag" },
    { partOfSpeech: "part-of-speech/noun", spelling: "wardrobe tags" },
  ],
  extends: ["page-type/image-tag"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
