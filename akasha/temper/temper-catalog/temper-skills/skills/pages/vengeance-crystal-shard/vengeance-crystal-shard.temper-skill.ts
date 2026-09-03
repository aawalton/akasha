import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceCrystalShard = {
  id: "019e6f53-a8de-72ce-be92-d33f87410208",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-crystal-shard",
  title: "Vengeance Crystal Shard",
  key: "vengeance-crystal-shard",
  baseName: "Vengeance Crystal Shard",
  description: '"Conjure dark crystals to bombard an enemy, dealing |cffffff11519|r Magic Damage."',
  icon: "/esoui/art/icons/ability_sorcerer_thunderclap.dds",
  esoSkillId: 237792,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "vengeance-sorcerer-dark-magic",
} as const satisfies TemperSkill
