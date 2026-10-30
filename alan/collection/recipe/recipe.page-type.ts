import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const recipe = {
  id: "01a06807-be66-700f-92e8-bca7096b21be",
  type: "page-type/page-type",
  slug: "recipe",
  definition: "something Alan cooks",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "recipe" },
    { partOfSpeech: "part-of-speech/noun", spelling: "recipes" },
  ],
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:08:53.094Z",
  updatedAt: "2026-10-30T15:09:34.964Z",
} as const satisfies PageType
