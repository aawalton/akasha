import type { WorldClass } from "../../world-class.page-type.ts"

export const shieldCompanion = {
  id: "01a06586-0a3a-773c-8fc9-4582d82a82e4",
  pageTypeSlug: "world-class",
  slug: "shield-companion",
  title: "Shield Companion",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["guardsman"],
  references: "jsonl",
} as const satisfies WorldClass
