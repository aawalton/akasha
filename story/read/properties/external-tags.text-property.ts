import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const externalTags = {
  id: "01a06554-d8bd-7dd9-bc8b-f7015c1af16c",
  type: "page-type/text-property",
  slug: "external-tags",
  propertySlug: "external-tags",
  definition: "a word the source files a collection under",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tag here is the source's own rather than the person's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tag is written as the source writes the tag rather than as a slug is written.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
