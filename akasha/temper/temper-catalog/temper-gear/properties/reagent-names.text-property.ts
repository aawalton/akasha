import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type ReagentName = string
export type ReagentNames = List<ReagentName>

export const reagentNames = {
  id: "01a05fd1-d43d-7249-ac3e-8dcf8869e271",
  pageTypeSlug: "text-property",
  slug: "reagent-names",
  propertySlug: "names",
  definition: "the reagents one recipe is brewed from",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to a reagent." },
    { invariantKind: "departure", statement: "One list holds every reagent one recipe takes." },
  ],
} as const satisfies TextProperty
