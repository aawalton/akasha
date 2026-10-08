import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const innkeeper = {
  id: "01a0657e-020a-7916-98e1-4f6d6c7407f3",
  type: "page-type/world-class",
  slug: "innkeeper",
  title: "Innkeeper",
  world: "world/the-wandering-inn",
  appearanceCount: 523,
  aliases: ["INNKEEPER", "innkeeper", "innkeepers"],
  evolvesToSlugs: ["world-class/awesome-innkeeper", "world-class/magical-innkeeper"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.010Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
