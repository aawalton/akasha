import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const cases = {
  id: "01a053eb-6b25-7c2a-a50f-f804c41457e3",
  type: "page-type/page-property-entry",
  slug: "cases",
  propertySlug: "cases",
  definition: "the texts sent to a model and the values a model must find",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "case" },
    { partOfSpeech: "part-of-speech/noun", spelling: "cases" },
  ],
  quoted: true,
  properties: [
    { pageProperty: "text-property/case-page", required: true, many: false },
    { pageProperty: "standard-agent-english-property/definition", required: true, many: false },
    { pageProperty: "text-property/case-asked", required: false, many: false },
    { pageProperty: "text-property/case-statement", required: true, many: false },
    { pageProperty: "select-property/case-answer", required: true, many: false },
    { pageProperty: "text-property/case-against", required: false, many: false },
  ],
  types: "ts",
  createdAt: "2026-08-30T18:25:32.453Z",
  updatedAt: "2026-09-25T18:02:21.000Z",
} as const satisfies PagePropertyEntry
