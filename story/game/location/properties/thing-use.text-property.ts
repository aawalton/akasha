import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const thingUse = {
  id: "01a0c645-dfc6-7a5e-90a0-d56d7f74a9bd",
  type: "page-type/text-property",
  slug: "thing-use",
  propertySlug: "use",
  definition: "what a thing in a place is good for, and what it is worth",
  maxLength: 300,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing good for nothing says so rather than saying nothing.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
