import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const scriptureTranslation = {
  id: "01a0658d-fe50-7004-9783-8442718557a7",
  type: "page-type/select-property",
  slug: "scripture-translation",
  propertySlug: "translation",
  definition: "a rendering of scripture",
  values: ["book-of-mormon", "web"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A book of scripture is read from one rendering.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
