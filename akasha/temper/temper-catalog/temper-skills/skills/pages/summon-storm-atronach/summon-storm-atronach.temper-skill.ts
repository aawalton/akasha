import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const summonStormAtronach = {
  id: "019e6f53-a7dd-7a13-99ae-ad2ddbdc1d08",
  pageTypeSlug: "temper-skill",
  slug: "summon-storm-atronach",
  title: "Summon Storm Atronach",
  key: "summon-storm-atronach",
  baseName: "Summon Storm Atronach",
  description:
    '"Summon an immobile storm atronach at the target location. Its arrival deals |cffffff8261|r Shock Damage and stuns enemies for |cffffff3|r seconds. The atronach zaps the closest enemy, dealing |cffffff3687|r Shock Damage every |cffffff1|r second.\\n\\nAn ally near the atronach can activate the Charged Lightning synergy, granting nearby allies Major Berserk for |cffffff10|r seconds, increasing their damage done by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_sorcerer_storm_atronach.dds",
  esoSkillId: 23634,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "ultimate",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
