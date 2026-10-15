import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const avidBoneyard117850 = {
  id: "019e6f53-9eda-7b63-967a-43e96e72d0f9",
  type: "page-type/temper-skill",
  slug: "avid-boneyard-117850",
  title: "Avid Boneyard",
  key: "avid-boneyard-117850",
  baseName: "Boneyard",
  description:
    "Desecrate the ground at the target location, dealing |cffffff11110|r Frost Damage over |cffffff10|r seconds to enemies inside and applying Minor Vulnerability, increasing their damage taken by |cffffff5|r%.\n\nConsumes a corpse on cast to deal |cffffff30|r% more damage.\n\nYou or an ally in the area can activate the Grave Robber synergy, dealing |cffffff8261|r Frost Damage to enemies and healing for the damage done.",
  icon: "/esoui/art/icons/ability_necromancer_004_b.dds",
  esoSkillId: 117850,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/active",
  hashPlace: 66,
  createdAt: "2026-05-28T16:03:31.674Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.012521 MaxStat + 0.131473 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Frost, AOE, DOT, 10s duration, 1s tick, R2 = 1)",
    "<<2>> = 10 seconds (Constant)",
    "<<3>> = Minor Vulnerability (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = 30% (Constant)",
    "<<6>> = Grave Robber (Constant)",
    "<<7>> = 0.1 MaxStat + 1.05 MaxPower (Ultimate, ratio = 10.50, Dmg, Frost, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
