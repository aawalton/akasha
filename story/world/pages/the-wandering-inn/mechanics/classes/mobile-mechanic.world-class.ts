import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mobileMechanic = {
  id: "01a0657e-0233-7e96-8e81-b24d0a5247b3",
  type: "page-type/world-class",
  slug: "mobile-mechanic",
  title: "Mobile Mechanic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
