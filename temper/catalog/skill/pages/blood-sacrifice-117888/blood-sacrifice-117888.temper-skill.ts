import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bloodSacrifice117888 = {
  id: "019e6f53-9f5a-798a-a316-641499e6029e",
  type: "page-type/temper-skill",
  slug: "blood-sacrifice-117888",
  title: "Blood Sacrifice",
  key: "blood-sacrifice-117888",
  baseName: "Render Flesh",
  description:
    "Sacrifice your own power to repair damaged flesh, healing you or an ally in front of you for |cffffff11321|r Health but applying Minor Defile to yourself for |cffffff4|r seconds, reducing your healing received and damage shield strength by |cffffff6|r%.\n\nConsumes a corpse near you when cast to heal a second target.",
  icon: "/esoui/art/icons/ability_necromancer_013_b.dds",
  esoSkillId: 117888,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 128,
  createdAt: "2026-05-28T16:03:31.802Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.15495 MaxStat + 1.62698 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = 6% (Constant)",
  ],
} as const satisfies TemperSkill
