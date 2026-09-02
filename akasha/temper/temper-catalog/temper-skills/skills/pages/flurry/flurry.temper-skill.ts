import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const flurry = {
  id: "01a05fd0-dc8f-7e12-ac21-32ca80f38bc5",
  pageTypeSlug: "temper-skill",
  slug: "flurry",
  title: "Flurry",
  key: "flurry",
  baseName: "Flurry",
  description:
    '"Flood an enemy with steel, battering them with four consecutive attacks that each deal |cffffff2320|r Physical Damage."',
  icon: "/esoui/art/icons/ability_dualwield_002.dds",
  esoSkillId: 28607,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
