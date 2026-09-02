import type { TemperSkill } from "../temper-skill.page-type.ts"

export const mending = {
  id: "01a05fd1-2dfb-7923-8aa2-63f3b092a892",
  pageTypeSlug: "temper-skill",
  slug: "mending",
  title: "Mending",
  key: "mending",
  baseName: "Mending",
  description:
    '"Increases your healing done by up to 13%, in proportion to the severity of the target\'s wounds."',
  icon: "/esoui/art/icons/ability_templar_004.dds",
  esoSkillId: 45206,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "templar-restoring-light",
  skillType: "passive",
  subcategoryId: "templar-restoring-light",
  status: "unsupported",
} as const satisfies TemperSkill
