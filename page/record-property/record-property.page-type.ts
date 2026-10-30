import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const recordProperty = {
  id: "01a04dff-9d7d-7801-928a-feeaaaa1c8f0",
  type: "page-type/page-type",
  slug: "record-property",
  definition: "a page property holding named fields",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "record property" },
    { partOfSpeech: "part-of-speech/noun", spelling: "record properties" },
  ],
  icon: "braces",
  extends: ["page-type/page-property"],
  properties: [
    { pageProperty: "one-of-property/properties", required: true, many: true, maxCount: null },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
  createdAt: "2026-08-29T14:49:52.765Z",
  updatedAt: "2026-10-30T17:01:18.842Z",
} as const satisfies PageType
