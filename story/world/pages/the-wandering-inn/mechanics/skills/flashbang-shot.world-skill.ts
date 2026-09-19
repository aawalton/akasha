import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flashbangShot = {
  id: "01a06575-980e-75ec-b647-63fd47c42af6",
  type: "page-type/world-skill",
  slug: "flashbang-shot",
  title: "Flashbang Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
