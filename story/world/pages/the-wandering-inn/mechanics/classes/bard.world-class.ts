import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bard = {
  id: "01a0657e-133b-7076-91bc-f65cd506e129",
  type: "page-type/world-class",
  slug: "bard",
  title: "Bard",
  world: "world/the-wandering-inn",
  appearanceCount: 166,
  aliases: ["bards"],
  evolvesToSlugs: ["world-class/goblin-soulbard"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.411Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
