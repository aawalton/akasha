import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSpearShards = {
  id: "019e6f53-a98e-7ec0-b349-68075492af83",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-spear-shards",
  title: "Vengeance Spear Shards",
  key: "vengeance-spear-shards",
  baseName: "Vengeance Spear Shards",
  description:
    '"Send your spear into the heavens to bring down a shower of divine wrath, dealing |cffffff8820|r Magic Damage to up to 3 enemies in the area."',
  icon: "/esoui/art/icons/ability_templar_sun_strike.dds",
  esoSkillId: 237887,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-aedric-spear",
  skillType: "active",
  subcategoryId: "vengeance-templar-aedric-spear",
} as const satisfies TemperSkill
