import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lordAdmiral = {
  id: "01a0657e-138f-70d4-ba3e-b93701894f11",
  type: "page-type/world-class",
  slug: "lord-admiral",
  title: "Lord Admiral",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
