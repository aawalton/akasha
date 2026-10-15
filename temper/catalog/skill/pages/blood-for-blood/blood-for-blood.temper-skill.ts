import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bloodForBlood = {
  id: "019e6251-4c8d-75d9-a252-7a50fc0632f3",
  type: "page-type/temper-skill",
  slug: "blood-for-blood",
  title: "Blood for Blood",
  key: "blood-for-blood",
  baseName: "Eviscerate",
  description:
    "Rend an enemy, dealing 2323 Magic Damage and applying the Hemorrhaging status effect.\n\nDeals up to 75% more damage based on your missing Health.\n\nAfter you cast this ability, you cannot be healed by allies for 3 seconds.",
  icon: "/esoui/art/icons/ability_u26_vampire_01_a.dds",
  esoSkillId: 41902,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
  hashPlace: 116,
  createdAt: "2026-05-26T03:25:55.725Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1033 MaxStat + 1.08465 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = Hemorrhaging (Constant)",
    "<<3>> = 75 (Constant)",
    "<<4>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
