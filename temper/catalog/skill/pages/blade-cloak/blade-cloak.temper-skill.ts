import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bladeCloak = {
  id: "019e6f53-9f17-7175-a7bb-f9459dc65461",
  type: "page-type/temper-skill",
  slug: "blade-cloak",
  title: "Blade Cloak",
  key: "blade-cloak",
  baseName: "Blade Cloak",
  description:
    "Envelop yourself in a protective cloak of razors, gaining Major Evasion for |cffffff20|r seconds, reducing damage from area attacks by |cffffff20|r%. \n\nEvery |cffffff2|r seconds the shrapnel will pulse, dealing |cffffff1467|r Physical Damage to all enemies within |cffffff5|r meters.",
  icon: "/esoui/art/icons/ability_dualwield_004.dds",
  esoSkillId: 28613,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/active",
  hashPlace: 99,
  createdAt: "2026-05-28T16:03:31.735Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 20 seconds (Constant)",
    "<<2>> = 20% (Constant)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 0.018182 MaxStat + 0.19091 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, AOE, DOT, 2s tick, R2 = 1)",
  ],
} as const satisfies TemperSkill
