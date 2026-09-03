import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const greaterStormAtronach23492 = {
  id: "019e6f53-a2a8-70bc-acc8-7c64c901bff5",
  pageTypeSlug: "temper-skill",
  slug: "greater-storm-atronach-23492",
  title: "Greater Storm Atronach",
  key: "greater-storm-atronach-23492",
  baseName: "Summon Storm Atronach",
  description:
    '"Summon an immobile storm atronach at the target location. Its arrival deals |cffffff8261|r Shock Damage and stuns enemies for |cffffff3|r seconds. The atronach zaps the closest enemy, dealing |cffffff4952|r Shock Damage every |cffffff1|r second.\\n\\nAn ally near the atronach can activate the Charged Lightning synergy, granting nearby allies Major Berserk for |cffffff10|r seconds, increasing their damage done by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_sorcerer_greater_storm_atronach.dds",
  esoSkillId: 23492,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "ultimate",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
