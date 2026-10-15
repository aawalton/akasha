import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const avidBoneyard = {
  id: "019e6245-a5f0-7cf4-9e5d-a75ade5014ed",
  type: "page-type/temper-skill",
  slug: "avid-boneyard",
  title: "Avid Boneyard",
  key: "avid-boneyard",
  baseName: "Boneyard",
  description:
    "Desecrate the ground at the target location, dealing 3190 Frost Damage over 10 seconds to enemies inside and applying Minor Vulnerability, increasing their damage taken by 5%.\n\nConsumes a corpse on cast to deal 30% more damage.\n\nYou or an ally in the area can activate the Grave Robber synergy, dealing 2249 Frost Damage to enemies and healing for the damage done.",
  icon: "/esoui/art/icons/ability_necromancer_004_b.dds",
  esoSkillId: 40117850,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/active",
  hashPlace: 65,
  createdAt: "2026-05-26T03:13:12.176Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.012934193 MaxStat + 0.135811609 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Frost, AOE, DOT, 10s duration, 1s tick, R2 = 1)",
    "<<2>> = 10 seconds (Constant)",
    "<<3>> = Minor Vulnerability (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = 30% (Constant)",
    "<<6>> = Grave Robber (Constant)",
    "<<7>> = 0.1 MaxStat + 1.05 MaxPower (Ultimate, ratio = 10.50, Dmg, Frost, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
