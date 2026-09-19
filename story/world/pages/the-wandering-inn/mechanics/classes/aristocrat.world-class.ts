import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const aristocrat = {
  id: "01a0657e-1330-7323-a6cc-ba0c123559ee",
  type: "page-type/world-class",
  slug: "aristocrat",
  title: "Aristocrat",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
