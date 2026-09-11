import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const shieldCompanion = {
  id: "01a06586-0a3a-773c-8fc9-4582d82a82e4",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "shield-companion",
  title: "Shield Companion",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["guardsman"],
  references: "jsonl",
} as const satisfies WorldClass
