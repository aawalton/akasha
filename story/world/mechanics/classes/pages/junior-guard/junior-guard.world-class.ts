import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const juniorGuard = {
  id: "01a0657e-1378-7a61-b9da-d35f748d4b98",
  type: "page-type/world-class",
  slug: "junior-guard",
  title: "Junior Guard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
