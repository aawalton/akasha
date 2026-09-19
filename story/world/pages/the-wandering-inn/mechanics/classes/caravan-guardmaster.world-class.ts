import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const caravanGuardmaster = {
  id: "01a0657e-01c2-73a0-a6ce-3273705ac07a",
  type: "page-type/world-class",
  slug: "caravan-guardmaster",
  title: "Caravan Guardmaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
