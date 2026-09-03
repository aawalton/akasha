import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const huntersEye = {
  id: "019e624a-12cc-7792-ae71-457a36e24a28",
  pageTypeSlug: "temper-skill",
  slug: "hunters-eye",
  title: "Hunter's Eye",
  key: "hunters-eye",
  baseName: "Hunter's Eye",
  description:
    '"Increases your Stealth Detection radius by 3 meters.\\n\\nIncreases your Movement Speed by 5% and your Physical and Spell Penetration by 950."',
  icon: "/esoui/art/icons/ability_armor_011.dds",
  esoSkillId: 45296,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-wood-elf-skills",
  skillType: "passive",
  subcategoryId: "racial-wood-elf-skills",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
