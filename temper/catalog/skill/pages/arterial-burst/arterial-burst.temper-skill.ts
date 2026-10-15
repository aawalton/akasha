import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const arterialBurst = {
  id: "019e6251-4c86-7017-a0f0-8c3eb1159bbc",
  type: "page-type/temper-skill",
  slug: "arterial-burst",
  title: "Arterial Burst",
  key: "arterial-burst",
  baseName: "Eviscerate",
  description:
    "Rend an enemy, dealing 2399 Magic Damage and applying the Hemorrhaging status effect.\n\nDeals up to 33% more damage based on your missing Health.\n\nIf you use this ability while you are under 50% Health, it will always be a Critical Strike.",
  icon: "/esoui/art/icons/ability_u26_vampire_01_b.dds",
  esoSkillId: 41881,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
  hashPlace: 51,
  createdAt: "2026-05-26T03:25:55.718Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1067089 MaxStat + 1.12044345 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = Hemorrhaging (Constant)",
    "<<3>> = 33 (Constant)",
  ],
} as const satisfies TemperSkill
