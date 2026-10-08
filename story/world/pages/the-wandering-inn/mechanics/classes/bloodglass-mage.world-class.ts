import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bloodglassMage = {
  id: "01a0657e-133f-7280-9f80-04277fe6e2ce",
  type: "page-type/world-class",
  slug: "bloodglass-mage",
  title: "Bloodglass Mage",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  evolvesFromSlugs: ["world-class/sand-mage"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.415Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
