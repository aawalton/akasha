import type { TemperSkill } from "../temper-skill.page-type.ts"

export const arrowBarrage38695 = {
  id: "01a05fd0-434f-73f2-9779-671b617dfb60",
  pageTypeSlug: "temper-skill",
  slug: "arrow-barrage-38695",
  title: "Arrow Barrage",
  key: "arrow-barrage-38695",
  baseName: "Volley",
  description:
    '"Launch a multitude of arrows into the sky to rain down, dealing |cffffff1605|r Physical Damage to enemies in the target area every |cffffff1|r second for |cffffff8|r seconds, after a |cffffff2|r second delay."',
  icon: "/esoui/art/icons/ability_bow_003_b.dds",
  esoSkillId: 38695,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
