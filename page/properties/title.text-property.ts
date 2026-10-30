import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const title = {
  id: "01a05fac-7582-7694-ae1f-480fe66ea27b",
  type: "page-type/text-property",
  slug: "title",
  propertySlug: "title",
  definition: "a thing's name",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "title" },
    { partOfSpeech: "part-of-speech/noun", spelling: "titles" },
  ],
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A title is written as the name is written rather than as a slug is written.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T01:12:12.930Z",
  updatedAt: "2026-10-30T15:49:21.639Z",
} as const satisfies TextProperty
