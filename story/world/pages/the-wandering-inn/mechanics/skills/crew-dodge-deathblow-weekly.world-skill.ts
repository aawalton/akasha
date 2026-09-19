import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const crewDodgeDeathblowWeekly = {
  id: "01a06575-97ff-7da7-beef-f0f2bedaadd5",
  type: "page-type/world-skill",
  slug: "crew-dodge-deathblow-weekly",
  title: "Crew: Dodge Deathblow (Weekly)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
