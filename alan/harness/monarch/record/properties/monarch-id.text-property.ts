import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const monarchId = {
  id: "01a0680a-1a00-7000-9d21-4f0b6a3d1101",
  type: "page-type/text-property",
  slug: "monarch-id",
  propertySlug: "monarch-id",
  definition: "the identity Monarch gives one of its records",
  maxLength: 40,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A Monarch identity is a run of digits Monarch mints rather than a uuid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record Alan wrote that Monarch never held has no Monarch identity.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sync matches an existing page by that page's Monarch identity.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
