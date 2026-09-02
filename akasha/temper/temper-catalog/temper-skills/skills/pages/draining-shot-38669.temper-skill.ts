import type { TemperSkill } from "../temper-skill.page-type.ts"

export const drainingShot38669 = {
  id: "01a05fd0-8e11-7b22-9b00-727d032ef0f2",
  pageTypeSlug: "temper-skill",
  slug: "draining-shot-38669",
  title: "Draining Shot",
  key: "draining-shot-38669",
  baseName: "Scatter Shot",
  description:
    '"Blast an enemy with an enchanted arrow, dealing |cffffff4845|r Physical Damage and reducing their Movement Speed by |cffffff60|r% for |cffffff3|r seconds.\\n\\nIf the enemy is hit, you heal for |cffffff7547|r."',
  icon: "/esoui/art/icons/ability_bow_004_a.dds",
  esoSkillId: 38669,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 14,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
