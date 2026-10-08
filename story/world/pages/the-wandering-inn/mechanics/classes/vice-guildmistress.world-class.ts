import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const viceGuildmistress = {
  id: "01a0657e-026e-74b3-9b45-2f68fd3689c3",
  type: "page-type/world-class",
  slug: "vice-guildmistress",
  title: "Vice Guildmistress",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/experienced-receptionist"],
  evolvesToSlugs: ["world-class/guildmistress-of-northern-blades"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.110Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
