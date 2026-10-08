import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const fandom = {
  id: "01a06807-be66-7004-85ae-8df6ba0ad747",
  type: "page-type/page-type",
  slug: "fandom",
  definition: "a world Alan follows across its shows and films",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "fandoms" }],
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:08:53.094Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies PageType
