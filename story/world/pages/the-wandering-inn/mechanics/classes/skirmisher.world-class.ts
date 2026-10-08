import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const skirmisher = {
  id: "01a0657e-0256-7026-99df-002a4d74e212",
  type: "page-type/world-class",
  slug: "skirmisher",
  title: "Skirmisher",
  world: "world/the-wandering-inn",
  appearanceCount: 48,
  aliases: ["skirmishers"],
  evolvesToSlugs: ["world-class/brave-skirmisher"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.086Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
