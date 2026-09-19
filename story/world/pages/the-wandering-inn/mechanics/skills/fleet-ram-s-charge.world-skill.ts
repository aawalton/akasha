import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fleetRamSCharge = {
  id: "01a06575-980e-74f6-a5f1-4b84b5fb2bf7",
  type: "page-type/world-skill",
  slug: "fleet-ram-s-charge",
  title: "Fleet: Ram’s Charge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
