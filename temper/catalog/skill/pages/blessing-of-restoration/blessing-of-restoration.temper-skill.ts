import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const blessingOfRestoration = {
  id: "019e6226-00d7-70ea-81b2-568b3d50d7b3",
  type: "page-type/temper-skill",
  slug: "blessing-of-restoration",
  title: "Blessing of Restoration",
  key: "blessing-of-restoration",
  baseName: "Blessing of Protection",
  description:
    "Slam your staff down to activate its blessings, healing you and your allies in front of you for 2970 Health.\n\nAlso grants Minor Resolve, increasing you and your allies' Physical Resistance and Spell Resistance by 2974 for 20 seconds.",
  icon: "/esoui/art/icons/ability_restorationstaff_003_a.dds",
  esoSkillId: 41169,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 107,
  createdAt: "2026-05-26T02:38:38.295Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.132052522 MaxStat + 1.38654425 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = Minor Resolve (Constant)",
    "<<3>> = 2974 (Constant)",
    "<<4>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
