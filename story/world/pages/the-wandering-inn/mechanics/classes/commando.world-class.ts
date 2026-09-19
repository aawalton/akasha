import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const commando = {
  id: "01a0657e-01c9-755c-bd50-eef5b5f4471a",
  type: "page-type/world-class",
  slug: "commando",
  title: "Commando",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
