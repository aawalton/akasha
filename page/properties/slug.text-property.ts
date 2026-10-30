import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const slug = {
  id: "01a049b9-856c-7187-96e0-518b0a8c72cb",
  type: "page-type/text-property",
  slug: "slug",
  propertySlug: "slug",
  definition: "a page's name",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "slug" },
    { partOfSpeech: "part-of-speech/noun", spelling: "slugs" },
  ],
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  unique: "unique-kind/page-type",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A slug that cannot become a page's export name is no slug.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-28T18:54:50.220Z",
  updatedAt: "2026-10-30T17:36:24.713Z",
} as const satisfies TextProperty
