import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bloodthirst = {
  id: "019e6226-00d8-7a2b-9562-efc2f804aacf",
  type: "page-type/temper-skill",
  slug: "bloodthirst",
  title: "Bloodthirst",
  key: "bloodthirst",
  baseName: "Flurry",
  description:
    "Flood an enemy with steel, battering them with four consecutive attacks that each deal 689 Bleed Damage and heal you for 33% of the damage caused.",
  icon: "/esoui/art/icons/ability_dualwield_002_a.dds",
  esoSkillId: 40599,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 131,
  createdAt: "2026-05-26T02:38:38.296Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0306801 MaxStat + 0.32213072 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Bleed, SingleTarget, Direct, Melee, 0.8s duration, 0.266s tick, R2 = 1)",
    "<<2>> = 33% (Constant)",
  ],
} as const satisfies TemperSkill
