import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const luminousShards = {
  id: "019e6245-a6c3-7057-8dcc-1af62a379fff",
  pageTypeSlug: "temper-skill",
  slug: "luminous-shards",
  title: "Luminous Shards",
  key: "luminous-shards",
  baseName: "Spear Shards",
  description:
    '"Send your spear into the heavens to bring down a shower of divine wrath, dealing 1742 Magic Damage to enemies in the area and an additional 165 Magic Damage every 1 second for 10 seconds.\\n\\nYou or an ally near the spear can activate the Holy Shards synergy, which restores 3960 Magicka and Stamina."',
  icon: "/esoui/art/icons/ability_templar_light_strike.dds",
  esoSkillId: 27122,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
