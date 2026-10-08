import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const greeter = {
  id: "01a0657e-01e5-77bb-b2e9-3f92b253cdad",
  type: "page-type/world-class",
  slug: "greeter",
  title: "Greeter",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.973Z",
  updatedAt: "2026-09-22T13:29:12.000Z",
} as const satisfies WorldClass
