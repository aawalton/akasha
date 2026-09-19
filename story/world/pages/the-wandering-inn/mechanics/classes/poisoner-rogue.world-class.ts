import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const poisonerRogue = {
  id: "01a06586-0a0a-734e-ab22-5ad730acf179",
  type: "page-type/world-class",
  slug: "poisoner-rogue",
  title: "Poisoner Rogue",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
