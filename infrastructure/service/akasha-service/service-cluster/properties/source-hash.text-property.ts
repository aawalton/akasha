import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const sourceHash = {
  id: "01a0d984-8903-76d1-85ae-d93496c8dcaa",
  type: "page-type/text-property",
  slug: "source-hash",
  propertySlug: "source-hash",
  definition: "the hash of the sources a deploy made an image from",
  maxLength: 64,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an image a deploy makes states the sources that image was made from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy makes no image where the sources hash to what this states.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
