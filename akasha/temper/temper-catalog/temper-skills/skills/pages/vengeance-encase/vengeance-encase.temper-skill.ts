import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceEncase = {
  id: "019e6f53-a8fc-7cfc-8199-ad8d782d0809",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-encase",
  title: "Vengeance Encase",
  key: "vengeance-encase",
  baseName: "Vengeance Encase",
  description:
    '"Call forth Daedric shards from the earth to immobilize up to 3 enemies in front of you for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_cyclone.dds",
  esoSkillId: 247103,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "vengeance-sorcerer-dark-magic",
} as const satisfies TemperSkill
