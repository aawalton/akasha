import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const acidSpray38701 = {
  id: "019e6f53-9e92-706a-b3e8-b896c820a496",
  type: "page-type/temper-skill",
  slug: "acid-spray-38701",
  title: "Acid Spray",
  key: "acid-spray-38701",
  baseName: "Arrow Spray",
  description:
    "Fire a burst of arrows in one shot, dealing |cffffff6401|r Poison Damage to enemies in front of you, and dealing an additional |cffffff5375|r Poison Damage over |cffffff5|r seconds.",
  icon: "/esoui/art/icons/ability_bow_005_b.dds",
  esoSkillId: 38701,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 15,
  createdAt: "2026-05-28T16:03:31.602Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077476 MaxStat + 0.81349 MaxPower (Ultimate, ratio = 10.50, Dmg, Poison, AOE, Direct, R2 = 1)",
    "<<2>> = 0.0140536 MaxStat + 0.148192 MaxPower + 0.12468 (Ultimate, ratio = 10.54, Dmg, Poison, SingleTarget, DOT, 4s duration, 1s tick, R2 = 0.999993)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
