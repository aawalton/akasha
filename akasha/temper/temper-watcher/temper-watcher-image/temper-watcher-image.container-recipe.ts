import type { ContainerRecipe } from "@akasha/code-system/container-recipe"

export const temperWatcherImage = {
  id: "01a0685d-ab5d-72a9-b18a-46c3a7cd02ff",
  pageTypeSlug: "container-recipe",
  slug: "temper-watcher-image",
  definition:
    "the image the Windows watcher tray and worker are cross-compiled in and taken out of",
  recipe: "dockerfile",
} as const satisfies ContainerRecipe
