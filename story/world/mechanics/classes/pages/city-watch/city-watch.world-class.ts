import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cityWatch = {
  id: "01a0657e-134a-7508-930f-3e99ce42fb41",
  type: "page-type/world-class",
  slug: "city-watch",
  title: "City Watch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
