import type { TextProperty } from "@akasha/pages-system/text-property"

export type SurplusTierSaid = string

export const surplusTierSaid = {
  id: "01a060fb-040e-73ac-99c7-d532658bcf3b",
  pageTypeSlug: "text-property",
  slug: "surplus-tier-said",
  propertySlug: "surplus-tier-said",
  definition: "the lowest rung Alan was told his surplus had fallen to on a day",
  max: 6,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This is what Alan was told rather than what he had.",
    },
  ],
} as const satisfies TextProperty
