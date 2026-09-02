import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceExpertHunter = {
  id: "01a05fd1-d2a0-7f06-831d-66f3141900dd",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-expert-hunter",
  title: "Vengeance Expert Hunter",
  key: "vengeance-expert-hunter",
  baseName: "Vengeance Expert Hunter",
  description:
    '"Invoke your expertise in anatomy and enemy behavior to increase your stealth detection by |cffffff35|r meters for |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_fightersguild_002.dds",
  esoSkillId: 246091,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-guild-fighters-guild",
  skillType: "active",
  subcategoryId: "vengeance-guild-fighters-guild",
} as const satisfies TemperSkill
