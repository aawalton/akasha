import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const strengthEnhancementGradual = {
  id: "01a0657d-02fe-7144-8d07-630de71fe26c",
  type: "page-type/world-skill",
  slug: "strength-enhancement-gradual",
  title: "Strength Enhancement (Gradual)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
