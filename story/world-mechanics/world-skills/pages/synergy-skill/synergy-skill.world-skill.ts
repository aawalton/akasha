import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const synergySkill = {
  id: "01a0657d-0307-7047-99bf-ef6244da23ea",
  type: "world-skill",
  slug: "synergy-skill",
  title: "Synergy Skill",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
