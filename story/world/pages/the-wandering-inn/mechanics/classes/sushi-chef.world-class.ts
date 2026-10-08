import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sushiChef = {
  id: "01a0657e-0262-76fa-a5a8-146bcc343d0a",
  type: "page-type/world-class",
  slug: "sushi-chef",
  title: "Sushi Chef",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.098Z",
  updatedAt: "2026-09-22T13:30:14.000Z",
} as const satisfies WorldClass
