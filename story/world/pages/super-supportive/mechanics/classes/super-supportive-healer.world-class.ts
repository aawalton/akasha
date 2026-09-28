import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superSupportiveHealer = {
  id: "01a0e9f2-9e34-762c-8b3d-be8a990af1c8",
  type: "page-type/world-class",
  slug: "super-supportive-healer",
  title: "Healer",
  world: "world/super-supportive",
  description: "A class that heals injuries.",
} as const satisfies WorldClass
