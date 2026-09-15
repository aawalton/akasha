import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const caravanMaster = {
  id: "01a0657e-01c2-73ea-a191-b843b055c63f",
  type: "world-class",
  slug: "caravan-master",
  title: "Caravan Master",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
