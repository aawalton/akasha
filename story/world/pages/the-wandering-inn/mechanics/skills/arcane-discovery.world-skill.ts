import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arcaneDiscovery = {
  id: "01a06575-97ec-7834-a429-a23cafb71f56",
  type: "page-type/world-skill",
  slug: "arcane-discovery",
  title: "Arcane Discovery",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
