import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const dawnbreakerOfSmiting = {
  id: "019e6238-c2b0-75c0-878f-8421daaec9a2",
  pageTypeSlug: "temper-skill",
  slug: "dawnbreaker-of-smiting",
  title: "Dawnbreaker of Smiting",
  key: "dawnbreaker-of-smiting",
  baseName: "Dawnbreaker",
  description:
    '"Arm yourself with Meridia\'s sacred sword and dispense her retribution, dealing 3600 Physical Damage to enemies in front of you, an additional 4314 Physical Damage over 6 seconds, and stunning them for 2 seconds."',
  icon: "/esoui/art/icons/ability_fightersguild_005_b.dds",
  esoSkillId: 42598,
  isMorph: true,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-fighters-guild",
  skillType: "ultimate",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
