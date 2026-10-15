import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bloodSacrifice = {
  id: "019e6245-a5fe-77b0-a19b-47bea6948532",
  type: "page-type/temper-skill",
  slug: "blood-sacrifice",
  title: "Blood Sacrifice",
  key: "blood-sacrifice",
  baseName: "Render Flesh",
  description:
    "Sacrifice your own power to repair damaged flesh, healing you or an ally in front of you for 3600 Health but applying Minor Defile to yourself for 4 seconds, reducing your healing received and damage shield strength by 6%.\n\nConsumes a corpse near you when cast to heal a second target.",
  icon: "/esoui/art/icons/ability_necromancer_013_b.dds",
  esoSkillId: 40117888,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 127,
  createdAt: "2026-05-26T03:13:12.190Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.16006335 MaxStat + 1.68067034 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = 6% (Constant)",
  ],
} as const satisfies TemperSkill
