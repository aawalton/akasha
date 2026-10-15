import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const arcticWind = {
  id: "019e6f53-9ebe-720b-a89f-e119635af20d",
  type: "page-type/temper-skill",
  slug: "arctic-wind",
  title: "Arctic Wind",
  key: "arctic-wind",
  baseName: "Arctic Wind",
  description:
    "Envelop yourself in winter winds, instantly healing for |cffffff6232|r Health and an additional |cffffff1246|r Health every |cffffff2|r seconds over |cffffff10|r seconds. This ability scales off your Max Health.",
  icon: "/esoui/art/icons/ability_warden_003.dds",
  esoSkillId: 86148,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 45,
  createdAt: "2026-05-28T16:03:31.646Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.3 Health (Health, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.06 Health (Health, RankMod(1), Heal, SingleTarget, DOT, 8s duration, 2s tick, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
