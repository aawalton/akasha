import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const barrier = {
  id: "019e6f53-9eee-7814-aea1-0f8977df5222",
  type: "page-type/temper-skill",
  slug: "barrier",
  title: "Barrier",
  key: "barrier",
  baseName: "Barrier",
  description:
    "Invoke defensive tactics to protect yourself and nearby group members with wards that each absorb up to |cffffff41192|r damage for |cffffff30|r seconds.",
  icon: "/esoui/art/icons/ability_ava_006.dds",
  esoSkillId: 38573,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 80,
  createdAt: "2026-05-28T16:03:31.694Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.5 MaxStat + 5.25 MaxPower (Ultimate, ratio = 10.50, RankMod(1), DmgShield, SingleTarget, Direct, 30s duration, R2 = 1)",
    "<<2>> = 30 seconds (Constant)",
  ],
} as const satisfies TemperSkill
