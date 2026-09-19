import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const gardensOfSanctuary = {
  id: "01a06575-9814-7a9e-a629-f75c90def6dc",
  type: "page-type/world-skill",
  slug: "gardens-of-sanctuary",
  title: "Gardens of Sanctuary",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
