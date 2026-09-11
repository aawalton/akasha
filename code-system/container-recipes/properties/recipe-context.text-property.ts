import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type RecipeContext = string

export const recipeContext = {
  id: "01a08ddc-a6ed-7746-aaae-45d7a714d1d7",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "recipe-context",
  propertySlug: "context",
  definition: "the folder a build of a recipe is handed",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is named from the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "Every path the recipe copies from sits under this folder.",
    },
    {
      invariantKind: "departure",
      statement: "A recipe nothing builds states no folder.",
    },
  ],
} as const satisfies TextProperty
