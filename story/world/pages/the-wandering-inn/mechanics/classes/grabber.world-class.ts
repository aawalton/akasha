import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const grabber = {
  id: "01a0657e-01e3-7acb-8ae1-fb8c0cc0aa8e",
  type: "page-type/world-class",
  slug: "grabber",
  title: "Grabber",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  aliases: ["grabbers"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.971Z",
  updatedAt: "2026-09-22T13:29:12.000Z",
} as const satisfies WorldClass
