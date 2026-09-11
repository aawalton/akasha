import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const steelTempest = {
  id: "01a06586-0a53-7e54-9ff5-eccf5500bbd6",
  type: "world-class",
  slug: "steel-tempest",
  title: "Steel Tempest",
  world: "the-wandering-inn",
  evolvesToSlugs: ["steelforged-whirlwind"],
  references: "jsonl",
} as const satisfies WorldClass
