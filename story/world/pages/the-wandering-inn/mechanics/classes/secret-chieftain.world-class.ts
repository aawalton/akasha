import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const secretChieftain = {
  id: "01a0657e-024b-7ba2-af75-b593a7368bfb",
  type: "page-type/world-class",
  slug: "secret-chieftain",
  title: "Secret Chieftain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
