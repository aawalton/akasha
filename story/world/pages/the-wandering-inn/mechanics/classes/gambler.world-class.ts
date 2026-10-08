import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gambler = {
  id: "01a0657e-1366-7bbb-9807-474fbc5218cd",
  type: "page-type/world-class",
  slug: "gambler",
  title: "Gambler",
  world: "world/the-wandering-inn",
  appearanceCount: 23,
  aliases: ["gamblers"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.454Z",
  updatedAt: "2026-09-22T13:29:04.000Z",
} as const satisfies WorldClass
