import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const dawnbreaker = {
  id: "019e6f53-a086-7ceb-8c5e-b47d1573ffe5",
  pageTypeSlug: "temper-skill",
  slug: "dawnbreaker",
  title: "Dawnbreaker",
  key: "dawnbreaker",
  baseName: "Dawnbreaker",
  description:
    '"Arm yourself with Meridia\'s sacred sword and dispense her retribution, dealing |cffffff10668|r Physical Damage to enemies in front of you and an additional |cffffff11424|r Physical Damage over |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_fightersguild_005.dds",
  esoSkillId: 35713,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "guild-fighters-guild",
  skillType: "ultimate",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
