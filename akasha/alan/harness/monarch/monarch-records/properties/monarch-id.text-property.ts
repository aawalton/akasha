import type { TextProperty } from "@akasha/pages-system/text-property"

export type MonarchId = string

export const monarchId = {
  id: "01a0680a-1a00-7000-9d21-4f0b6a3d1101",
  pageTypeSlug: "text-property",
  slug: "monarch-id",
  propertySlug: "monarch-id",
  definition: "the identity Monarch gives one of its records",
  max: 40,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A Monarch identity is a run of digits Monarch mints rather than a uuid.",
    },
    {
      invariantKind: "departure",
      statement: "A record Alan wrote that Monarch never held carries no Monarch identity.",
    },
    {
      invariantKind: "departure",
      statement: "A Monarch identity is what a sync matches a standing page by.",
    },
  ],
} as const satisfies TextProperty
