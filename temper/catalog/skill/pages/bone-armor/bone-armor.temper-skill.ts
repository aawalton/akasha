import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const boneArmor = {
  id: "019e6f53-9f6f-72a7-acdc-4243995e749e",
  type: "page-type/temper-skill",
  slug: "bone-armor",
  title: "Bone Armor",
  key: "bone-armor",
  baseName: "Bone Armor",
  description:
    "Wrap yourself in hardened bone, granting you Major Resolve and Minor Resolve for |cffffff20|r seconds, increasing your Physical Resistance and Spell Resistance by |cffffff5948|r and |cffffff2974|r.\n\nIf cast during combat, you can cast a corpse consuming ability on yourself. This effect can occur once every |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_necromancer_008.dds",
  esoSkillId: 115206,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/active",
  hashPlace: 143,
  createdAt: "2026-05-28T16:03:31.823Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 5948 (Constant)",
    "<<2>> = 2974 (Constant)",
    "<<3>> = 17 seconds (Constant)",
    "<<4>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
