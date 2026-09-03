import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const spearShards = {
  id: "019e6f53-a77f-7c78-be65-2a4745af63f0",
  pageTypeSlug: "temper-skill",
  slug: "spear-shards",
  title: "Spear Shards",
  key: "spear-shards",
  baseName: "Spear Shards",
  description:
    '"Send your spear into the heavens to bring down a shower of divine wrath, dealing |cffffff6400|r Magic Damage to enemies in the area and an additional |cffffff578|r Magic Damage every |cffffff1|r second for |cffffff10|r seconds.\\n\\nAn ally near the spear can activate the Blessed Shards synergy, restoring |cffffff3960|r Magicka or Stamina, whichever maximum is higher."',
  icon: "/esoui/art/icons/ability_templar_sun_strike.dds",
  esoSkillId: 26188,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
