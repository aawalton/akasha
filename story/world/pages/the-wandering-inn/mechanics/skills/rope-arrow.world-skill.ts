import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ropeArrow = {
  id: "01a0657d-02b6-70b9-b044-12f661c69303",
  type: "page-type/world-skill",
  slug: "rope-arrow",
  title: "Rope Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
