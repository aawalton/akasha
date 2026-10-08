import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const clown = {
  id: "01a0657e-134b-7abc-8312-aaca91772437",
  type: "page-type/world-class",
  slug: "clown",
  title: "Clown",
  world: "world/the-wandering-inn",
  appearanceCount: 30,
  aliases: ["clowns"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.427Z",
  updatedAt: "2026-09-22T13:28:49.000Z",
} as const satisfies WorldClass
