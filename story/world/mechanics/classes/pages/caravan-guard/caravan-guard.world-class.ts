import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const caravanGuard = {
  id: "01a0657e-1346-7b64-9317-23b904e3c891",
  type: "page-type/world-class",
  slug: "caravan-guard",
  title: "Caravan Guard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
