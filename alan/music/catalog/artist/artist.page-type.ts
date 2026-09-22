import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const artist = {
  id: "01a06243-144b-7013-99b2-e1b52805e43b",
  type: "page-type/page-type",
  slug: "artist",
  definition: "a musician whose work Alan keeps",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "artist" },
    { partOfSpeech: "part-of-speech/noun", spelling: "artists" },
  ],
  extends: ["page-type/collection-external"],
  parts: ["file-property/reaction", "text-property/artist-genre"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/artist-genre", required: false, many: true, maxCount: null },
    { pageProperty: "file-property/reaction", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
