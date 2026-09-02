import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type AlchemyEffect = string
export type AlchemyEffects = List<AlchemyEffect>

export const alchemyEffects = {
  id: "01a05fd1-d435-7be6-b06d-cee7752f59c6",
  pageTypeSlug: "text-property",
  slug: "alchemy-effects",
  propertySlug: "alchemy-effects",
  definition: "the four effects a reagent can lend what it is brewed into",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to a poison effect." },
    { invariantKind: "departure", statement: "One list holds every effect a reagent carries." },
  ],
} as const satisfies TextProperty
