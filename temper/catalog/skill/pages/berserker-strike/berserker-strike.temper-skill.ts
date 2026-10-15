import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const berserkerStrike = {
  id: "019e6f53-9f05-7485-a764-fc8263de60e7",
  type: "page-type/temper-skill",
  slug: "berserker-strike",
  title: "Berserker Strike",
  key: "berserker-strike",
  baseName: "Berserker Strike",
  description:
    "Strike at an enemy with a vicious blow, dealing |cffffff12116|r Physical Damage to them and all nearby enemies.\n\nThis attack ignores the target's Physical Resistance, and grants you Physical and Spell Resistance equal to the amount ignored from the initial target for |cffffff12|r seconds.",
  icon: "/esoui/art/icons/ability_2handed_006.dds",
  esoSkillId: 83216,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 50,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 90,
  createdAt: "2026-05-28T16:03:31.717Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15 MaxStat + 1.575 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, SingleTarget, Direct, Melee, 0.4s cooldown, R2 = 1)",
    "<<2>> = 12 seconds (Constant)",
  ],
} as const satisfies TemperSkill
