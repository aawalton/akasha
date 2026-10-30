import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const disabilityWeight = {
  id: "01a183bf-b6a0-7563-bb73-8e70586300a9",
  type: "page-type/number-property",
  slug: "disability-weight",
  propertySlug: "disability-weight",
  definition:
    "the part of a year of full health a disability takes in the Global Burden of Disease study",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "disability weight" },
    { partOfSpeech: "part-of-speech/noun", spelling: "disability weights" },
  ],
  max: 1,
  types: "ts",
  createdAt: "2026-10-28T18:22:21.854Z",
  updatedAt: "2026-10-30T16:16:40.714Z",
} as const satisfies NumberProperty
