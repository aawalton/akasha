import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bindingJavelin26804 = {
  id: "019e6f53-9f0b-73bb-acac-d23fe932d176",
  type: "page-type/temper-skill",
  slug: "binding-javelin-26804",
  title: "Binding Javelin",
  key: "binding-javelin-26804",
  baseName: "Piercing Javelin",
  description:
    "Hurl your spear at an enemy with godlike strength, dealing |cffffff4845|r Physical Damage and stunning them for |cffffff4|r seconds.\n\nThis ability ignores the enemy's Resistances and cannot be blocked.",
  icon: "/esoui/art/icons/ability_templar_light_spear.dds",
  esoSkillId: 26804,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 93,
  createdAt: "2026-05-28T16:03:31.723Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06198 MaxStat + 0.65079 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 2.5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
