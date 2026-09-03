import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const iceComet = {
  id: "019e6238-c2c8-7408-bf3e-838073ad3ad3",
  pageTypeSlug: "temper-skill",
  slug: "ice-comet",
  title: "Ice Comet",
  key: "ice-comet",
  baseName: "Meteor",
  description:
    '"Call a comet down from the constellations to blast an enemy, dealing 4620 Frost Damage to all enemies in the area, knocking them down, stunning them for 2 seconds, and reducing their Movement Speed by 50% for 5 seconds. \\n\\nAfter impact, enemies in the target area take 1319 Frost Damage every 1 second for 11 seconds."',
  icon: "/esoui/art/icons/ability_mageguild_005_b.dds",
  esoSkillId: 42478,
  isMorph: true,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-mages-guild",
  skillType: "ultimate",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
