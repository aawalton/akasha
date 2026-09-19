import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spearFlurry = {
  id: "01a0657d-02ec-7b66-8bba-cfc9ee0f7ced",
  type: "page-type/world-skill",
  slug: "spear-flurry",
  title: "Spear Flurry",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
