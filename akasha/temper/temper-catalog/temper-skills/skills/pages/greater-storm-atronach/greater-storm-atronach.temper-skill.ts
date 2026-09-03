import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const greaterStormAtronach = {
  id: "019e6245-a695-7bf6-a2be-d6e4eedb8f84",
  pageTypeSlug: "temper-skill",
  slug: "greater-storm-atronach",
  title: "Greater Storm Atronach",
  key: "greater-storm-atronach",
  baseName: "Summon Storm Atronach",
  description:
    '"Summon an immobile storm atronach at the target location. Its arrival deals 2249 Shock Damage and stuns enemies for 3 seconds. The atronach zaps the closest enemy, dealing 1509 Shock Damage every 1 second.\\n\\nAn ally near the atronach can activate the Charged Lightning synergy, granting nearby allies Major Berserk for 10 seconds, increasing their damage done by 10%."',
  icon: "/esoui/art/icons/ability_sorcerer_greater_storm_atronach.dds",
  esoSkillId: 30575,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "ultimate",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
