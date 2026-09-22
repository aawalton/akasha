import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const arrowBarrage = {
  id: "019e6226-00d2-7127-a90f-5b9179bec5ad",
  type: "page-type/temper-skill",
  slug: "arrow-barrage",
  title: "Arrow Barrage",
  key: "arrow-barrage",
  baseName: "Volley",
  description:
    '"Launch a multitude of arrows into the sky to rain down, dealing 460 Physical Damage to enemies in the target area every 1 second for 8 seconds, after a 2 second delay."',
  icon: "/esoui/art/icons/ability_bow_003_b.dds",
  esoSkillId: 40944,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
