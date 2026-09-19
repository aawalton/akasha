import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const innSAura = {
  id: "01a06575-981f-7687-9f14-00a3e731dbd0",
  type: "page-type/world-skill",
  slug: "inn-s-aura",
  title: "Inn’s Aura",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
