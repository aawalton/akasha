import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const boneyard = {
  id: "019e6f53-9f76-76be-bdb1-ab8d323ed670",
  type: "page-type/temper-skill",
  slug: "boneyard",
  title: "Boneyard",
  key: "boneyard",
  baseName: "Boneyard",
  description:
    "Desecrate the ground at the target location, dealing |cffffff10747|r Frost Damage over |cffffff10|r seconds to enemies inside and applying Minor Vulnerability, increasing their damage taken by |cffffff5|r%.\n\nConsumes a corpse on cast to deal |cffffff30|r% more damage.\n\nAn ally in the area can activate the Grave Robber synergy, dealing |cffffff8261|r Frost Damage to nearby enemies and healing for the damage done.",
  icon: "/esoui/art/icons/ability_necromancer_004.dds",
  esoSkillId: 115252,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/active",
  hashPlace: 149,
  createdAt: "2026-05-28T16:03:31.830Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.012121 MaxStat + 0.127273 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Frost, AOE, DOT, 10s duration, 1s tick, R2 = 1)",
    "<<2>> = 10 seconds (Constant)",
    "<<3>> = Minor Vulnerability (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = 30% (Constant)",
    "<<6>> = Grave Robber (Constant)",
    "<<7>> = 0.1 MaxStat + 1.05 MaxPower (Ultimate, ratio = 10.50, Dmg, Frost, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
