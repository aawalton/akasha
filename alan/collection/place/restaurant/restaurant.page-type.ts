import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const restaurant = {
  id: "01a06807-be66-700b-be52-bd042c86fc17",
  type: "page-type/page-type",
  slug: "restaurant",
  definition: "a place where Alan eats",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "restaurant" },
    { partOfSpeech: "part-of-speech/noun", spelling: "restaurants" },
  ],
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
