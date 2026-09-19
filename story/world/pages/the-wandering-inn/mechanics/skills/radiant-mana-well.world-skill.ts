import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const radiantManaWell = {
  id: "01a0657d-029c-719c-b95a-0c0f9b8fa329",
  type: "page-type/world-skill",
  slug: "radiant-mana-well",
  title: "Radiant Mana Well",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
