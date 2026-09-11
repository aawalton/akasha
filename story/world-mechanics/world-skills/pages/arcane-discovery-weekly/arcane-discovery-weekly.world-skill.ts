import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const arcaneDiscoveryWeekly = {
  id: "01a06575-97ec-7030-95c1-3f7982bc3732",
  type: "world-skill",
  slug: "arcane-discovery-weekly",
  title: "Arcane Discovery (Weekly)",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
