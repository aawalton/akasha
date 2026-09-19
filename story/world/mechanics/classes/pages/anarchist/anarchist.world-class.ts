import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const anarchist = {
  id: "01a0657e-01a8-7216-9dcd-4baf46599acf",
  type: "page-type/world-class",
  slug: "anarchist",
  title: "Anarchist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
