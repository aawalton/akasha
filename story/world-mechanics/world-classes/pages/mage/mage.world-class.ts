import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const mage = {
  id: "01a0657e-0229-758f-aed9-d8cb28e4f932",
  type: "world-class",
  slug: "mage",
  title: "Mage",
  world: "the-wandering-inn",
  aliases: ["mages"],
  evolvesToSlugs: ["druid"],
  references: "jsonl",
} as const satisfies WorldClass
