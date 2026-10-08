import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magicLovingPrincess = {
  id: "01a0657e-139b-72a1-b842-23a7c16d04d7",
  type: "page-type/world-class",
  slug: "magic-loving-princess",
  title: "Magic-loving Princess",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: ["world-class/archmage-s-apprentice-princess"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.507Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
