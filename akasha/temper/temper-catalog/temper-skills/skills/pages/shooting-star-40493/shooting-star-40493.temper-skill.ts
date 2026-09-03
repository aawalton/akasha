import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shootingStar40493 = {
  id: "019e6f53-a709-7e78-a1f2-60e8084c3aab",
  pageTypeSlug: "temper-skill",
  slug: "shooting-star-40493",
  title: "Shooting Star",
  key: "shooting-star-40493",
  baseName: "Meteor",
  description:
    '"Call a comet down from the constellations to blast an enemy, dealing |cffffff14936|r Flame Damage to all enemies in the area, knocking them down, and stunning them for |cffffff2|r seconds.\\n\\nAfter impact, enemies in the target area take |cffffff4038|r Flame Damage every |cffffff1|r second for |cffffff11|r seconds.\\n\\nYou generate |cffffff10|r Ultimate for each enemy hit by the initial blast, up to 6 times."',
  icon: "/esoui/art/icons/ability_mageguild_005_a.dds",
  esoSkillId: 40493,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 2,
  rank: 10,
  skillLineId: "guild-mages-guild",
  skillType: "ultimate",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
