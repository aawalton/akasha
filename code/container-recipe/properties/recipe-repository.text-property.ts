import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const recipeRepository = {
  id: "01a08de4-9042-7962-b887-9de3467bd20b",
  type: "page-type/text-property",
  slug: "recipe-repository",
  propertySlug: "repository",
  definition: "the name an image is held under in the registry it is pushed to",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "The name carries no registry host.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The name carries no tag.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
