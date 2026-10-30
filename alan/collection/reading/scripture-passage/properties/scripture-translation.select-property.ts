import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const scriptureTranslation = {
  id: "01a0658d-fe50-7004-9783-8442718557a7",
  type: "page-type/select-property",
  slug: "scripture-translation",
  propertySlug: "translation",
  definition: "a version of scripture",
  values: ["book-of-mormon", "web"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A book of scripture is read from one rendering.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T04:36:39.632Z",
  updatedAt: "2026-10-30T15:11:03.561Z",
} as const satisfies SelectProperty
