import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const innkeeper = {
  id: "01a0657e-020a-7916-98e1-4f6d6c7407f3",
  type: "page-type/world-class",
  slug: "innkeeper",
  title: "Innkeeper",
  world: "world/the-wandering-inn",
  aliases: ["INNKEEPER", "innkeeper", "innkeepers"],
  evolvesToSlugs: ["awesome-innkeeper", "magical-innkeeper"],
  references: "jsonl",
} as const satisfies WorldClass
