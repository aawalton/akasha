import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const greenMage = {
  id: "01a0657e-136e-710e-92fe-bdda389179c3",
  type: "page-type/world-class",
  slug: "green-mage",
  title: "Green Mage",
  world: "world/the-wandering-inn",
  appearanceCount: 37,
  aliases: ["green-mages"],
  evolvesToSlugs: ["world-class/bloodearth-mage"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.462Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
