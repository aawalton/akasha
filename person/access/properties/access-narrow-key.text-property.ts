import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const accessNarrowKey = {
  id: "01a0c521-66bd-7307-a70c-179ad63c3b98",
  type: "page-type/text-property",
  slug: "access-narrow-key",
  propertySlug: "key",
  definition: "the key by which an access weighs a page",
  maxLength: 100,
  nameFormat: "name-format/lower-camel-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The key is the one a page spells rather than the one its property declares.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
