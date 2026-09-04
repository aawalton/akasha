import type { WorldClass } from "../../world-class.page-type.ts"

export const steelTempest = {
  id: "01a06586-0a53-7e54-9ff5-eccf5500bbd6",
  pageTypeSlug: "world-class",
  slug: "steel-tempest",
  title: "Steel Tempest",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["steelforged-whirlwind"],
  references: "jsonl",
} as const satisfies WorldClass
