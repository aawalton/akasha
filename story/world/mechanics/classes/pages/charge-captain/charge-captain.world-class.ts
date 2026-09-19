import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const chargeCaptain = {
  id: "01a0657e-01c4-7cdd-b5e3-7b846e62b249",
  type: "page-type/world-class",
  slug: "charge-captain",
  title: "Charge Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
