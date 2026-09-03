import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const silverShards40300 = {
  id: "019e6f53-a720-77f4-a635-611c5dd35c14",
  pageTypeSlug: "temper-skill",
  slug: "silver-shards-40300",
  title: "Silver Shards",
  key: "silver-shards-40300",
  baseName: "Silver Bolts",
  description:
    '"Fire an augmented Dawnguard Vampire Hunter\'s crossbow bolt to strike an enemy, dealing |cffffff7681|r Physical Damage.\\n\\nFires additional bolts at other enemies near the initial target for |cffffff22|r% less damage."',
  icon: "/esoui/art/icons/ability_fightersguild_003_a.dds",
  esoSkillId: 40300,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 2,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
