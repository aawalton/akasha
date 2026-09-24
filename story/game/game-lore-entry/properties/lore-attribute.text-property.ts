import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const loreAttribute = {
  id: "01a0c94a-24a0-7f69-aaf7-6f4519df2aca",
  type: "page-type/text-property",
  slug: "lore-attribute",
  propertySlug: "attribute",
  definition: "which thing about its subject an entity entry settles",
  maxLength: 60,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry superseding another settles the same thing about the same subject.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
