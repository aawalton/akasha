import type { Namespace } from "../namespace.page-type.ts"

export const exercise = {
  id: "01a07bbc-0f93-722d-a707-caac9256d6e5",
  pageTypeSlug: "namespace",
  slug: "exercise",
  definition: "the movements Alan trains and what decides the next one",
  partSlugs: [
    "command/exercise-add",
    "namespace/exercise-constraint",
    "namespace/exercise-equipment",
    "command/exercise-history",
    "namespace/exercise-mobility",
    "command/exercise-next-set",
    "command/exercise-policy-show",
    "namespace/exercise-profile",
    "command/exercise-ranks",
    "command/exercise-schedule-create",
    "command/exercise-select",
    "command/exercise-today",
  ],
} as const satisfies Namespace
