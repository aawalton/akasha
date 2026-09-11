import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const massRestoreStamina = {
  id: "01a0657d-024b-78fb-a1c7-a6428647ede4",
  type: "world-skill",
  slug: "mass-restore-stamina",
  title: "Mass Restore Stamina",
  world: "the-wandering-inn",
} as const satisfies WorldSkill
