import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const weaponTrainer = {
  id: "01a06586-0a76-7434-b098-2621552f0137",
  type: "page-type/world-class",
  slug: "weapon-trainer",
  title: "Weapon Trainer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
