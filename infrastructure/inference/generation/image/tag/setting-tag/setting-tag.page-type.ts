import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const settingTag = {
  id: "01a0de87-c740-7f2f-8b53-a405781be0a0",
  type: "page-type/page-type",
  slug: "setting-tag",
  definition: "a place or scene an image is set in",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "setting tag" },
    { partOfSpeech: "part-of-speech/noun", spelling: "setting tags" },
  ],
  extends: ["page-type/image-tag"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
