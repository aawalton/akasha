import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const braidedTether118070 = {
  id: "019e6f53-9f87-79de-a8e0-2c54f30bb343",
  type: "page-type/temper-skill",
  slug: "braided-tether-118070",
  title: "Braided Tether",
  key: "braided-tether-118070",
  baseName: "Restoring Tether",
  description:
    "Siphon the last remnants of life from a corpse, healing for |cffffff18090|r Health over |cffffff12|r seconds to yourself, all allies around you, and all allies between you and the corpse. \n\nWhile slotted, your healing done is increased by |cffffff3|r%.",
  icon: "/esoui/art/icons/ability_necromancer_017_a.dds",
  esoSkillId: 118070,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 161,
  createdAt: "2026-05-28T16:03:31.847Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.013773 MaxStat + 0.14462 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, DOT, 11.334s duration, 0.666s tick, R2 = 1)",
    "<<2>> = 12 seconds (Constant)",
    "<<3>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill
