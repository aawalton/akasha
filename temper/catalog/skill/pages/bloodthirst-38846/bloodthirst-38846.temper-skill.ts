import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bloodthirst38846 = {
  id: "019e6f53-9f60-781a-9e95-504d0be40aa3",
  type: "page-type/temper-skill",
  slug: "bloodthirst-38846",
  title: "Bloodthirst",
  key: "bloodthirst-38846",
  baseName: "Flurry",
  description:
    "Flood an enemy with steel, battering them with four consecutive attacks that each deal |cffffff2398|r Bleed Damage and heal you for |cffffff34|r% of the damage caused.",
  icon: "/esoui/art/icons/ability_dualwield_002_a.dds",
  esoSkillId: 38846,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 132,
  createdAt: "2026-05-28T16:03:31.808Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0297 MaxStat + 0.31184 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Bleed, SingleTarget, Direct, Melee, 0.8s duration, 0.266s tick, R2 = 1)",
    "<<2>> = 33% (Constant)",
  ],
} as const satisfies TemperSkill
