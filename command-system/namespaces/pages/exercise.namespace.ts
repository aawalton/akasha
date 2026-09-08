import type { Namespace } from "../namespace.page-type.ts"

export const exercise = {
  id: "01a07bbc-0f93-722d-a707-caac9256d6e5",
  pageTypeSlug: "namespace",
  slug: "exercise",
  definition: "the movements Alan trains and what decides the next one",
  partSlugs: [
    "namespace/exercise-constraint",
    "namespace/exercise-equipment",
    "namespace/exercise-mobility",
    "namespace/exercise-profile",
  ],
} as const satisfies Namespace
