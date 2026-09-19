import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const battlefieldPowerOfFire = {
  id: "01a06575-97f4-7f31-985d-5e93d28df3b4",
  type: "page-type/world-skill",
  slug: "battlefield-power-of-fire",
  title: "Battlefield: Power of Fire",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
