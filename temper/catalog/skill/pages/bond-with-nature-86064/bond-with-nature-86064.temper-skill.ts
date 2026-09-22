import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bondWithNature86064 = {
  id: "019e6f53-9f6d-7f1a-bc14-c36ff755c766",
  type: "page-type/temper-skill",
  slug: "bond-with-nature-86064",
  title: "Bond with Nature",
  key: "bond-with-nature-86064",
  baseName: "Bond with Nature",
  description:
    '"Anytime one of your Animal Companion skills end, you are healed for |cffffff780|r Health."',
  icon: "/esoui/art/icons/passive_warden_010.dds",
  esoSkillId: 86064,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
