import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const applyHealingGel = {
  id: "01a06575-97eb-7916-b735-da30dd9e7865",
  type: "page-type/world-skill",
  slug: "apply-healing-gel",
  title: "Apply Healing Gel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
