import type { TextProperty } from "@akasha/pages-system/text-property"

export type PlayerId = string

export const playerId = {
  id: "01a06596-f0d5-7007-a70d-0e2e56b9aacd",
  pageTypeSlug: "text-property",
  slug: "player-id",
  propertySlug: "player-id",
  definition: "the player whose card it is",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "Two of the three players named here stand as pages and the third does not.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to a player.",
    },
  ],
} as const satisfies TextProperty
