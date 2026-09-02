import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceFlurry = {
  id: "01a05fd1-d2a4-7260-bd8f-9abe275e1701",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-flurry",
  title: "Vengeance Flurry",
  key: "vengeance-flurry",
  baseName: "Vengeance Flurry",
  description:
    '"Flood an enemy with steel, battering them with four consecutive attacks that each deal |cffffff3200|r Physical Damage."',
  icon: "/esoui/art/icons/ability_dualwield_002.dds",
  esoSkillId: 240585,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-dual-wield",
  skillType: "active",
  subcategoryId: "vengeance-weapon-dual-wield",
} as const satisfies TemperSkill
