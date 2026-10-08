import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const grocers = {
  id: "01a0657e-01e5-7dcd-a70f-85c108004f9a",
  type: "page-type/world-class",
  slug: "grocers",
  title: "Grocers",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.973Z",
  updatedAt: "2026-09-22T13:29:12.000Z",
} as const satisfies WorldClass
