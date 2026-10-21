import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const boneGoliathTransformation = {
  id: "019e6f53-9f70-7487-a540-436302ac6103",
  type: "page-type/temper-skill",
  slug: "bone-goliath-transformation",
  title: "Bone Goliath Transformation",
  key: "bone-goliath-transformation",
  baseName: "Bone Goliath Transformation",
  description:
    "Become a horrific Bone Goliath, increasing your Max Health by |cffffff30000|r for |cffffff20|r seconds and immediately restoring |cffffff30000|r Health. \n\nWhile transformed, your damaging Light Attacks restore |cffffff402|r Health and your fully-charged Heavy Attacks restore |cffffff1005|r Health. This ability scales off your Max Health.",
  icon: "/esoui/art/icons/ability_necromancer_012.dds",
  esoSkillId: 115001,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 144,
  createdAt: "2026-05-28T16:03:31.824Z",
  updatedAt: "2026-10-21T05:05:04.595Z",
  equations: [
    "<<1>> = 30000 (Constant)",
    "<<2>> = 20 seconds (Constant)",
    "<<1>> = 30000 (Constant, Repeat)",
    "<<3>> = 0.02 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
    "<<4>> = 0.05 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
