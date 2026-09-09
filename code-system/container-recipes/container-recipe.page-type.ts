import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { Recipe } from "./properties/recipe.file-property.ts"

export type ContainerRecipe = Domain & {
  recipe: Recipe
}

export const containerRecipe = {
  id: "01a06815-9efd-7003-8c8e-4c03b44672b2",
  pageTypeSlug: "page-type",
  slug: "container-recipe",
  definition: "the steps a container image is built from",
  pluralSlug: "container-recipes",
  partSlugs: ["file-property/recipe"],
  extends: ["page-type/domain"],
  properties: [{ pagePropertySlug: "file-property/recipe", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A container recipe is in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A recipe has one image.",
    },
    {
      invariantKind: "departure",
      statement: "A second image is a second page.",
    },
    {
      invariantKind: "departure",
      statement: "A path a recipe copies from is read from the folder the build is handed.",
    },
    {
      invariantKind: "departure",
      statement: "The folder a build is handed is the package the recipe sits in.",
    },
    {
      invariantKind: "absence",
      statement: "A recipe says nothing about where its image is pushed.",
    },
  ],
} as const satisfies PageType
