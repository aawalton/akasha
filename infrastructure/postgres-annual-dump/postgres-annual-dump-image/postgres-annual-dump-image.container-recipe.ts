import type { ContainerRecipe } from "@akasha/code/container-recipe"

export const postgresAnnualDumpImage = {
  id: "01a06865-c012-7003-8c4a-6d2e8b3f4a03",
  pageTypeSlug: "container-recipe",
  slug: "postgres-annual-dump-image",
  definition: "the image the yearly dump runs from, with the Postgres tools and rclone",
  recipe: "dockerfile",
} as const satisfies ContainerRecipe
