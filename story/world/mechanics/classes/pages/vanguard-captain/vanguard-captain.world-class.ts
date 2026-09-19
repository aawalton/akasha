import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const vanguardCaptain = {
  id: "01a06586-0a6e-7a1d-822e-ad8a4251aa91",
  type: "page-type/world-class",
  slug: "vanguard-captain",
  title: "Vanguard Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
