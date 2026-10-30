import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const monarchId = {
  id: "01a0680a-1a00-7000-9d21-4f0b6a3d1101",
  type: "page-type/text-property",
  slug: "monarch-id",
  propertySlug: "monarch-id",
  definition: "the id a Monarch record has in Monarch",
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
  createdAt: "2026-09-03T16:11:27.616Z",
  updatedAt: "2026-10-30T15:48:25.085Z",
} as const satisfies TextProperty
