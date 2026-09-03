import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const backlash = {
  id: "019e6f53-9edb-7d27-85a4-509c6ecfe86c",
  pageTypeSlug: "temper-skill",
  slug: "backlash",
  title: "Backlash",
  key: "backlash",
  baseName: "Backlash",
  description:
    '"Summon an expanding beam of pure sunlight to doom an enemy, dealing |cffffff4036|r Magic Damage immediately and marking them for |cffffff6|r seconds.\\n\\nAfter the duration ends, the sunlight bursts, dealing |cffffff4468|r Magic Damage to the enemy, which increases based on the amount of damage you dealt to them over the duration, up to |cffffff200|r%.\\n\\nYou can have only one Backlash active at a time."',
  icon: "/esoui/art/icons/ability_templar_backlash.dds",
  esoSkillId: 21761,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
