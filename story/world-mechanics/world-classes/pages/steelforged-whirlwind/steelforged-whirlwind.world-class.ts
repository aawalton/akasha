import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const steelforgedWhirlwind = {
  id: "01a06586-0a53-7ed5-abcb-834151de80e7",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "steelforged-whirlwind",
  title: "Steelforged Whirlwind",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["steel-tempest"],
  references: "jsonl",
} as const satisfies WorldClass
