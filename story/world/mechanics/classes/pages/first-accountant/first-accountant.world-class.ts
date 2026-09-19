import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const firstAccountant = {
  id: "01a0657e-1364-78ae-b214-eda44b61a99b",
  type: "page-type/world-class",
  slug: "first-accountant",
  title: "First Accountant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
