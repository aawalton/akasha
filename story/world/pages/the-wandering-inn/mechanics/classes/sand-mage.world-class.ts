import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sandMage = {
  id: "01a0657e-024a-78a2-b46d-8041a8bd32a9",
  type: "page-type/world-class",
  slug: "sand-mage",
  title: "Sand Mage",
  world: "world/the-wandering-inn",
  appearanceCount: 21,
  aliases: ["sand-mages"],
  evolvesToSlugs: ["world-class/bloodglass-mage"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.074Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
