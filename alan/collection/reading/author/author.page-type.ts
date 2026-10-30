import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const author = {
  id: "01a06807-be66-7000-b600-748274bb5ac8",
  type: "page-type/page-type",
  slug: "author",
  definition: "someone that writes books Alan reads",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "author" },
    { partOfSpeech: "part-of-speech/noun", spelling: "authors" },
  ],
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:08:53.094Z",
  updatedAt: "2026-10-30T15:12:19.644Z",
} as const satisfies PageType
