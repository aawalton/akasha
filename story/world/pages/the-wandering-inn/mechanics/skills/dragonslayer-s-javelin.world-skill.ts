import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dragonslayerSJavelin = {
  id: "01a06575-9805-7c77-af18-4bc81a643ef5",
  type: "page-type/world-skill",
  slug: "dragonslayer-s-javelin",
  title: "Dragonslayer’s Javelin",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
