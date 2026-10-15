import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const assassinSBlade = {
  id: "019e6f53-9ecd-7230-9a97-33b99610bbc9",
  type: "page-type/temper-skill",
  slug: "assassin-s-blade",
  title: "Assassin's Blade",
  key: "assassin-s-blade",
  baseName: "Assassin's Blade",
  description:
    "Thrust a magic blade with lethal precision to stab an enemy, dealing |cffffff4036|r Magic Damage. Deals |cffffff300|r% more damage to enemies below |cffffff25|r% Health.",
  icon: "/esoui/art/icons/ability_nightblade_017.dds",
  esoSkillId: 33386,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/active",
  hashPlace: 56,
  createdAt: "2026-05-28T16:03:31.661Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05 MaxStat + 0.525 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 300 (Constant)",
    "<<3>> = 25 (Constant)",
  ],
} as const satisfies TemperSkill
