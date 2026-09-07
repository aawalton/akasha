import type { Namespace } from "../namespace.page-type.ts"

export const exerciseMobility = {
  id: "01a07bbc-0f93-7c7c-8c25-4b9da7fade70",
  pageTypeSlug: "namespace",
  slug: "exercise-mobility",
  definition: "how far Alan's joints move",
  partSlugs: ["command/exercise-mobility-log", "command/exercise-mobility-show"],
} as const satisfies Namespace
