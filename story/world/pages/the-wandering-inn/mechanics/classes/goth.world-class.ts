import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const goth = {
  id: "01a0657e-01e3-79f1-ad61-529c6c348141",
  type: "page-type/world-class",
  slug: "goth",
  title: "Goth",
  world: "world/the-wandering-inn",
  appearanceCount: 31,
  aliases: ["goths"],
  evolvesToSlugs: ["world-class/midnight-goth"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.971Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
