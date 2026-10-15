import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const berserkerRage = {
  id: "019e6226-00d6-7448-a192-766a5fb3da00",
  type: "page-type/temper-skill",
  slug: "berserker-rage",
  title: "Berserker Rage",
  key: "berserker-rage",
  baseName: "Berserker Strike",
  description:
    "Strike at an enemy with a vicious blow, dealing 3600 Physical Damage to them and all nearby enemies.\n\nThis attack ignores the target's Resistance and grants you Physical and Spell Resistance equal to the amount ignored from the initial target for 8 seconds.\n\nYou are immune to all disabling, snare, and immobilization effects for the duration.",
  icon: "/esoui/art/icons/ability_2handed_006_b.dds",
  esoSkillId: 86295,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 88,
  createdAt: "2026-05-26T02:38:38.294Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.16006335 MaxStat + 1.68067034 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, SingleTarget, Direct, Melee, 0.4s cooldown, R2 = 1)",
    "<<2>> = 12 seconds (Constant)",
  ],
} as const satisfies TemperSkill
