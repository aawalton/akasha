import type { Namespace } from "../namespace.page-type.ts"

export const exerciseEquipment = {
  id: "01a07bbc-0f93-7067-8f7f-2d9d4592007e",
  pageTypeSlug: "namespace",
  slug: "exercise-equipment",
  definition: "what Alan has to train with",
  partSlugs: ["command/exercise-equipment-list", "command/exercise-equipment-set"],
} as const satisfies Namespace
