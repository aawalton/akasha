import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gladiator = {
  id: "01a0657e-01e2-7394-81bc-e1bbc7359226",
  type: "page-type/world-class",
  slug: "gladiator",
  title: "Gladiator",
  world: "world/the-wandering-inn",
  appearanceCount: 25,
  aliases: ["gladiators"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.970Z",
  updatedAt: "2026-09-22T13:29:04.000Z",
} as const satisfies WorldClass
