import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const iceComet40489 = {
  id: "019e6f53-a33e-7195-9f50-7165a92b25a7",
  pageTypeSlug: "temper-skill",
  slug: "ice-comet-40489",
  title: "Ice Comet",
  key: "ice-comet-40489",
  baseName: "Meteor",
  description:
    '"Call a comet down from the constellations to blast an enemy, dealing |cffffff16971|r Frost Damage to all enemies in the area, knocking them down, stunning them for |cffffff2|r seconds, and reducing their Movement Speed by |cffffff50|r% for |cffffff5|r seconds. \\n\\nAfter impact, enemies in the target area take |cffffff4589|r Frost Damage every |cffffff1|r second for |cffffff11|r seconds."',
  icon: "/esoui/art/icons/ability_mageguild_005_b.dds",
  esoSkillId: 40489,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 1,
  rank: 10,
  skillLineId: "guild-mages-guild",
  skillType: "ultimate",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
