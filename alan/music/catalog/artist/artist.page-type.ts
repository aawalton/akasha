import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const artist = {
  id: "01a06243-144b-7013-99b2-e1b52805e43b",
  type: "page-type/page-type",
  slug: "artist",
  definition: "a person or a group that makes songs Alan keeps",
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
  createdAt: "2026-09-02T13:15:58.411Z",
  updatedAt: "2026-10-30T16:15:53.582Z",
} as const satisfies PageType
