import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const blazingSpear26869 = {
  id: "019e6f53-9f2b-7acb-b13f-a306bc3f3d1d",
  type: "page-type/temper-skill",
  slug: "blazing-spear-26869",
  title: "Blazing Spear",
  key: "blazing-spear-26869",
  baseName: "Spear Shards",
  description:
    "Send your spear into the heavens to bring down a shower of divine wrath, dealing |cffffff6401|r Magic Damage to enemies in the area and an additional |cffffff965|r Magic Damage every |cffffff1|r second for |cffffff10|r seconds. Enemies hit by the initial hit are immobilized for |cffffff4|r seconds.\n\nAn ally near the spear can activate the Blessed Shards synergy, restoring |cffffff3960|r Magicka or Stamina, whichever maximum is higher.",
  icon: "/esoui/art/icons/ability_templarsun_thrust.dds",
  esoSkillId: 26869,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 104,
  createdAt: "2026-05-28T16:03:31.755Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.0119979 MaxStat + 0.125266 MaxPower - 1.18621 (Ultimate, ratio = 10.44, Dmg, Magic, AOE, DOT, 1s tick, R2 = 0.999988)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 4 seconds (Constant)",
    "<<6>> = Blessed Shards (Constant)",
    "<<7>> = 3960 (Constant)",
  ],
} as const satisfies TemperSkill
