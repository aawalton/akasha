import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const numberProperty = {
  id: "01a04dff-9d7d-757f-84a2-1c515ad24f9a",
  type: "page-type/page-type",
  slug: "number-property",
  definition: "a page property with a number",
  icon: "hash",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "number property" },
    { partOfSpeech: "part-of-speech/noun", spelling: "number properties" },
  ],
  extends: ["page-type/page-property"],
  parts: ["number-property/max"],
  properties: [{ pageProperty: "number-property/max", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
  createdAt: "2026-08-29T14:49:52.765Z",
  updatedAt: "2026-10-30T15:27:56.725Z",
} as const satisfies PageType
