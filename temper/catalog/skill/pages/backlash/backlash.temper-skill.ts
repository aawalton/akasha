import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const backlash = {
  id: "019e6f53-9edb-7d27-85a4-509c6ecfe86c",
  type: "page-type/temper-skill",
  slug: "backlash",
  title: "Backlash",
  key: "backlash",
  baseName: "Backlash",
  description:
    "Summon an expanding beam of pure sunlight to doom an enemy, dealing |cffffff4036|r Magic Damage immediately and marking them for |cffffff6|r seconds.\n\nAfter the duration ends, the sunlight bursts, dealing |cffffff4468|r Magic Damage to the enemy, which increases based on the amount of damage you dealt to them over the duration, up to |cffffff200|r%.\n\nYou can have only one Backlash active at a time.",
  icon: "/esoui/art/icons/ability_templar_backlash.dds",
  esoSkillId: 21761,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/active",
  hashPlace: 67,
  createdAt: "2026-05-28T16:03:31.675Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0499489 MaxStat + 0.524968 MaxPower - 0.306011 (Ultimate, ratio = 10.51, Dmg, Magic, SingleTarget, Direct, R2 = 0.999999)",
    "<<2>> = 6 seconds (Constant)",
    "<<3>> = 0.0553692 MaxStat + 0.581472 MaxPower - 2.84114 (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<4>> = 200% (Constant)",
    "<<5>> = Backlash (Constant)",
  ],
} as const satisfies TemperSkill
