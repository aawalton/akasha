import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const boundlessStorm = {
  id: "019e6245-a604-7e61-b2cb-cd920ea52d52",
  type: "page-type/temper-skill",
  slug: "boundless-storm",
  title: "Boundless Storm",
  key: "boundless-storm",
  baseName: "Lightning Form",
  description:
    "Manifest yourself as pure lightning, zapping nearby enemies with electricity dealing 463 Shock Damage every 2 seconds for 30 seconds.\n\nWhile in this form you also gain Major Resolve, increasing your Physical Resistance and Spell Resistance by 5948.\n\nActivating this grants you Major Expedition, increasing your Movement Speed by 30% for 4 seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_boundless_storm.dds",
  esoSkillId: 30255,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/active",
  hashPlace: 157,
  createdAt: "2026-05-26T03:13:12.196Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.02066 MaxStat + 0.21693 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, AOE, DOT, 2s tick, R2 = 1)",
    "<<2>> = 2 seconds (Constant)",
    "<<3>> = 30 seconds (Constant)",
    "<<4>> = 5948 (Constant)",
    "<<5>> = 30% (Constant)",
    "<<6>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
