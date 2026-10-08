import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const author = {
  id: "01a06807-be66-7000-b600-748274bb5ac8",
  type: "page-type/page-type",
  slug: "author",
  definition: "one who wrote what Alan reads",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "author" },
    { partOfSpeech: "part-of-speech/noun", spelling: "authors" },
  ],
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:08:53.094Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies PageType
