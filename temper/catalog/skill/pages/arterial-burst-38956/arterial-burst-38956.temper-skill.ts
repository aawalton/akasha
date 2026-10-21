import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const arterialBurst38956 = {
  id: "019e6f53-9ec7-7d5e-ab8a-6c107c3ef211",
  type: "page-type/temper-skill",
  slug: "arterial-burst-38956",
  title: "Arterial Burst",
  key: "arterial-burst-38956",
  baseName: "Eviscerate",
  description:
    "Rend an enemy, dealing |cffffff8342|r Magic Damage and applying the Hemorrhaging status effect.\n\nDeals up to |cffffff33|r% more damage based on your missing Health.\n\nIf you use this ability while you are under |cffffff50|r% Health, it will always be a Critical Strike.",
  icon: "/esoui/art/icons/ability_u26_vampire_01_b.dds",
  esoSkillId: 38956,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
  hashPlace: 52,
  createdAt: "2026-05-28T16:03:31.655Z",
  updatedAt: "2026-10-21T16:02:37.525Z",
  equations: [
    "<<1>> = 0.1033 MaxStat + 1.08465 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1, rank IV)",
    "<<2>> = Hemorrhaging (Constant)",
    "<<3>> = 33 (Constant)",
    "<<4>> = 50% (Constant)",
  ],
} as const satisfies TemperSkill
