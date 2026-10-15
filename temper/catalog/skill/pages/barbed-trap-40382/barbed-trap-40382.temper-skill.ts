import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const barbedTrap40382 = {
  id: "019e6f53-9eed-760f-be35-c55662de5741",
  type: "page-type/temper-skill",
  slug: "barbed-trap-40382",
  title: "Barbed Trap",
  key: "barbed-trap-40382",
  baseName: "Trap Beast",
  description:
    "Set a sharpened blade trap at your location, which takes |cffffff1.5|r seconds to arm and lasts for |cffffff20|r seconds.\n\nWhen triggered, the trap deals |cffffff5004|r Bleed Damage, an additional |cffffff11790|r Bleed Damage over |cffffff20|r seconds, and grants you Minor Force, increasing your Critical Damage by |cffffff10|r% for the duration.\n\nEnemies hit by the initial hit are afflicted with the Hemorrhaging status effect.\n\n Enemies who activate the trap are immobilized for |cffffff2|r seconds.",
  icon: "/esoui/art/icons/ability_fightersguild_004_a.dds",
  esoSkillId: 40382,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 79,
  createdAt: "2026-05-28T16:03:31.693Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 20 seconds (Constant)",
    "<<2>> = 0.0620437 MaxStat + 0.650882 MaxPower - 2.37419 (Ultimate, ratio = 10.49, Dmg, Bleed, SingleTarget, Direct, Melee, R2 = 1)",
    "<<3>> = 0.015495 MaxStat + 0.162697 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Bleed, SingleTarget, DOT, 18s duration, 2s tick, R2 = 1)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = 10% (Constant)",
    "<<6>> = Hemorrhaging (Constant)",
    "<<7>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
