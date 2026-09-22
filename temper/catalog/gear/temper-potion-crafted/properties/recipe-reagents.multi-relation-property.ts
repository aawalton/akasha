import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const recipeReagents = {
  id: "01a0cb17-e012-793c-ab5d-5488d2255121",
  type: "page-type/multi-relation-property",
  slug: "recipe-reagents",
  propertySlug: "reagents",
  definition: "the reagents one recipe brews a drink from",
  targetPageType: "page-type/temper-reagent",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One list holds every reagent one recipe takes.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
