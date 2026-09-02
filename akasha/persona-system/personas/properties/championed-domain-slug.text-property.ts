import type { TextProperty } from "@akasha/pages-system/text-property"

export type ChampionedDomainSlug = string

export const championedDomainSlug = {
  id: "01a0534a-80f9-742b-83f5-bdbe548d9b58",
  pageTypeSlug: "text-property",
  slug: "championed-domain-slug",
  propertySlug: "championed-domain-slug",
  definition: "the domain a persona champions",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "Five domains of the thirty-nine domains championed stand as pages.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to a domain.",
    },
  ],
} as const satisfies TextProperty
