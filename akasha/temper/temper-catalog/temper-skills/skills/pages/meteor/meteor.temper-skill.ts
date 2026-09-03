import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const meteor = {
  id: "019e6f53-a484-7ae6-8215-c4ce01e1d2be",
  pageTypeSlug: "temper-skill",
  slug: "meteor",
  title: "Meteor",
  key: "meteor",
  baseName: "Meteor",
  description:
    '"Call a comet down from the constellations to blast an enemy, dealing |cffffff14934|r Flame Damage to all enemies in the area, knocking them down, and stunning them for |cffffff2|r seconds.\\n\\nAfter impact, enemies in the target area take |cffffff4036|r Flame Damage every |cffffff1|r second for |cffffff11|r seconds."',
  icon: "/esoui/art/icons/ability_mageguild_005.dds",
  esoSkillId: 16536,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "guild-mages-guild",
  skillType: "ultimate",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
