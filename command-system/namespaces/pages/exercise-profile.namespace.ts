import type { Namespace } from "../namespace.page-type.ts"

export const exerciseProfile = {
  id: "01a07bbc-0f93-7a92-982d-ffa6930bcf5b",
  pageTypeSlug: "namespace",
  slug: "exercise-profile",
  definition: "what Alan's body brings to a movement",
  partSlugs: ["command/exercise-profile-set", "command/exercise-profile-show"],
} as const satisfies Namespace
