import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const yFfreSEndurance = {
  id: "019e6f53-aa09-7744-9877-d0d66c08cd19",
  pageTypeSlug: "temper-skill",
  slug: "y-ffre-s-endurance",
  title: "Y'ffre's Endurance",
  key: "y-ffre-s-endurance",
  baseName: "Y'ffre's Endurance",
  description: '"Increases your Stamina Recovery by |cffffff86|r."',
  icon: "/esoui/art/icons/ability_templar_002.dds",
  esoSkillId: 64279,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "racial-wood-elf-skills",
  skillType: "passive",
  subcategoryId: "racial-wood-elf-skills",
} as const satisfies TemperSkill
