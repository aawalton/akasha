import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const portalGuardian = {
  id: "01a06586-0a0a-7b3d-ba57-96a0d5459c2e",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "portal-guardian",
  title: "Portal Guardian",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["doorgnoll"],
  references: "jsonl",
} as const satisfies WorldClass
