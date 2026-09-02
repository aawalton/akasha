import type { TemperSkill } from "../temper-skill.page-type.ts"

export const arrowBarrage = {
  id: "01a05fd0-434f-7299-a755-593ba50dedfb",
  pageTypeSlug: "temper-skill",
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
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
