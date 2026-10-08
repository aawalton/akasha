import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const paladin = {
  id: "01a0657e-13b5-7268-9de9-07b55af3419c",
  type: "page-type/world-class",
  slug: "paladin",
  title: "Paladin",
  world: "world/the-wandering-inn",
  appearanceCount: 54,
  aliases: ["paladins"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.533Z",
  updatedAt: "2026-09-22T13:29:43.000Z",
} as const satisfies WorldClass
