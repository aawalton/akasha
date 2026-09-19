import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pickpocket = {
  id: "01a0657e-0237-73f5-bb53-b07c5ccf3926",
  type: "page-type/world-class",
  slug: "pickpocket",
  title: "Pickpocket",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
