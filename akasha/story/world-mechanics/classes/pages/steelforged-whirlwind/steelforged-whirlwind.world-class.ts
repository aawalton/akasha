import type { WorldClass } from "../../world-class.page-type.ts"

export const steelforgedWhirlwind = {
  id: "01a06586-0a53-7ed5-abcb-834151de80e7",
  pageTypeSlug: "world-class",
  slug: "steelforged-whirlwind",
  title: "Steelforged Whirlwind",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["steel-tempest"],
  references: "jsonl",
} as const satisfies WorldClass
