import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bloodForBlood38949 = {
  id: "019e6f53-9f48-7f04-b483-6dbc8c7f01cf",
  type: "page-type/temper-skill",
  slug: "blood-for-blood-38949",
  title: "Blood for Blood",
  key: "blood-for-blood-38949",
  baseName: "Eviscerate",
  description:
    "Rend an enemy, dealing |cffffff8076|r Magic Damage and applying the Hemorrhaging status effect.\n\nDeals up to |cffffff75|r% more damage based on your missing Health.\n\nAfter you cast this ability, you cannot be healed by allies for |cffffff3|r seconds.",
  icon: "/esoui/art/icons/ability_u26_vampire_01_a.dds",
  esoSkillId: 38949,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/active",
  hashPlace: 117,
  createdAt: "2026-05-28T16:03:31.784Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1033 MaxStat + 1.08465 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = Hemorrhaging (Constant)",
    "<<3>> = 60 (Constant)",
    "<<4>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
