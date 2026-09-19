import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arcaneDiscoveryWeekly = {
  id: "01a06575-97ec-7030-95c1-3f7982bc3732",
  type: "page-type/world-skill",
  slug: "arcane-discovery-weekly",
  title: "Arcane Discovery (Weekly)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
