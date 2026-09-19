import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const president = {
  id: "01a0657e-023e-7158-b301-23651f754b43",
  type: "page-type/world-class",
  slug: "president",
  title: "President",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
