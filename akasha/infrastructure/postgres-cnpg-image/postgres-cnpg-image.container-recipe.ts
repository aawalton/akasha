import type { ContainerRecipe } from "@akasha/code-system/container-recipe"

export const postgresCnpgImage = {
  id: "01a0685d-ab5d-737f-8ad6-6ecbb49de6e6",
  pageTypeSlug: "container-recipe",
  slug: "postgres-cnpg-image",
  definition: "the CloudNativePG image the Postgres cluster runs, its extensions built in",
  recipe: "dockerfile",
} as const satisfies ContainerRecipe
