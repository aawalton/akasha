import type { Namespace } from "../namespace.page-type.ts"

export const exerciseConstraint = {
  id: "01a07bbc-0f93-762c-af6b-04d8a6a85e5a",
  pageTypeSlug: "namespace",
  slug: "exercise-constraint",
  definition: "a limit on what Alan's training may ask of him",
  partSlugs: ["command/exercise-constraint-list", "command/exercise-constraint-set"],
} as const satisfies Namespace
