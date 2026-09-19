import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const treasurer = {
  id: "01a0657e-026d-7b16-99ab-96d194d47af6",
  type: "page-type/world-class",
  slug: "treasurer",
  title: "Treasurer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
