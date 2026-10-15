import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const boltEscape = {
  id: "019e6f53-9f68-7575-bb2a-79035ee2d08b",
  type: "page-type/temper-skill",
  slug: "bolt-escape",
  title: "Bolt Escape",
  key: "bolt-escape",
  baseName: "Bolt Escape",
  description:
    "Transform yourself into pure energy and flash forward, stunning enemies near your final location for |cffffff3|r seconds. \n\nThis effect cannot be blocked.\n\nCasting again within |cffffff4|r seconds costs |cffffff33|r% more Magicka.",
  icon: "/esoui/art/icons/ability_sorcerer_bolt_escape.dds",
  esoSkillId: 23234,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/active",
  hashPlace: 138,
  createdAt: "2026-05-28T16:03:31.816Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1 second (Constant)",
    "<<2>> = 4 seconds (Constant)",
    "<<3>> = 33% (Constant)",
  ],
} as const satisfies TemperSkill
