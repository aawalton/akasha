import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const barbedTrap = {
  id: "019e6238-c298-7e64-9b8d-0a92ab254a70",
  type: "page-type/temper-skill",
  slug: "barbed-trap",
  title: "Barbed Trap",
  key: "barbed-trap",
  baseName: "Trap Beast",
  description:
    "Set a sharpened blade trap at your location, which takes 1.5 seconds to arm and lasts for 20 seconds.\n\nWhen triggered, the trap deals 1438 Bleed Damage, an additional 3580 Bleed Damage over 20 seconds, and grants you Minor Force, increasing your Critical Damage by 10% for the duration.\n\nEnemies hit by the initial hit are afflicted with the Hemorrhaging status effect.\n\n Enemies who activate the trap are immobilized for 2 seconds.",
  icon: "/esoui/art/icons/ability_fightersguild_004_a.dds",
  esoSkillId: 42747,
  isMorph: true,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 78,
  createdAt: "2026-05-26T02:59:07.544Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 20 seconds (Constant)",
    "<<2>> = 0.0640613 MaxStat + 0.672578 MaxPower - 3.1811 (Ultimate, ratio = 10.50, Dmg, Bleed, SingleTarget, Direct, Melee, R2 = 0.999999)",
    "<<3>> = 0.016006335 MaxStat + 0.168066001 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Bleed, SingleTarget, DOT, 18s duration, 2s tick, R2 = 1)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = 10% (Constant)",
    "<<6>> = Hemorrhaging (Constant)",
    "<<7>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
