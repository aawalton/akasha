import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bloodMist = {
  id: "019e6251-4c8e-7e56-8b4e-a80ba48cd239",
  type: "page-type/temper-skill",
  slug: "blood-mist",
  title: "Blood Mist",
  key: "blood-mist",
  baseName: "Mist Form",
  description:
    "Dissolve into a bloody mist, causing the next 3 projectiles to deal no damage to you for 1 second while you dash forward and reappear at your target location after a short duration.\n\nUpon activation you drain the blood of those around you for 20 seconds, dealing 435 Magic Damage every 2 seconds to enemies and healing you for 45% of the damage caused.\n\nCasting again within 4 seconds costs 33% more Magicka.",
  icon: "/esoui/art/icons/ability_u26_vampire_05_b.dds",
  esoSkillId: 41824,
  isMorph: true,
  learnedLevel: 9,
  lineRankNeeded: 9,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
  hashPlace: 121,
  createdAt: "2026-05-26T03:25:55.726Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1 second (Constant)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 0.019401806 MaxStat + 0.20371793 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, AOE, DOT, 2s tick, R2 = 1)",
    "<<4>> = 2 seconds (Constant)",
    "<<5>> = 45% (Constant)",
    "<<6>> = 4 seconds (Constant)",
    "<<7>> = 33% (Constant)",
  ],
} as const satisfies TemperSkill
