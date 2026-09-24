import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const numberProperty = {
  id: "01a04dff-9d7d-757f-84a2-1c515ad24f9a",
  type: "page-type/page-type",
  slug: "number-property",
  definition: "a page property with a number",
  icon: "hash",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "number" },
    { partOfSpeech: "part-of-speech/noun", spelling: "numbers" },
  ],
  extends: ["page-type/page-property"],
  parts: ["number-property/max"],
  properties: [{ pageProperty: "number-property/max", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
