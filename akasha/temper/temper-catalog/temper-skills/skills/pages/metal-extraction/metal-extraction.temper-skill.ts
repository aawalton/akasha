import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const metalExtraction = {
  id: "01a05fd1-2dfc-7464-90b6-5dad935c5140",
  pageTypeSlug: "temper-skill",
  slug: "metal-extraction",
  title: "Metal Extraction",
  key: "metal-extraction",
  baseName: "Metal Extraction",
  description:
    '"Maximizes the chances of extracting Blacksmithing ingredients and allows the refining of the most powerful tempers from raw materials."',
  icon: "/esoui/art/icons/ability_smith_003.dds",
  esoSkillId: 48165,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-blacksmithing",
  skillType: "passive",
  subcategoryId: "craft-blacksmithing",
} as const satisfies TemperSkill
