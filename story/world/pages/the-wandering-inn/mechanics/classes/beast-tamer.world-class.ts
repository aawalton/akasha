import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const beastTamer = {
  id: "01a0657e-01b7-758d-afdb-180671fe9c20",
  type: "page-type/world-class",
  slug: "beast-tamer",
  title: "Beast Tamer",
  world: "world/the-wandering-inn",
  appearanceCount: 54,
  aliases: ["beast-tamers"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.927Z",
  updatedAt: "2026-09-22T13:28:33.000Z",
} as const satisfies WorldClass
