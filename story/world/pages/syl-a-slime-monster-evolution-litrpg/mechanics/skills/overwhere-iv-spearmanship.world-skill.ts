import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvSpearmanship = {
  id: "01a0f195-67e2-7de0-8e9e-d09aebd920fe",
  type: "page-type/world-skill",
  slug: "overwhere-iv-spearmanship",
  title: "Spearmanship",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "Skill with the spear: thrust, guard and reach.",
} as const satisfies WorldSkill
