import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const beckoningArmor = {
  id: "019e6245-a5f5-71b2-8210-25a9f4e88528",
  type: "page-type/temper-skill",
  slug: "beckoning-armor",
  title: "Beckoning Armor",
  key: "beckoning-armor",
  baseName: "Bone Armor",
  description:
    "Wrap yourself in hardened bone, granting you Major Resolve and Minor Resolve for 20 seconds, increasing your Physical Resistance and Spell Resistance by 5948 and 2974.\n\nWhile active, ranged attackers will be pulled to you once every 2 seconds and become taunted for 15 seconds if they are not already taunted.\n\nIf cast during combat, you can cast a corpse consuming ability on yourself. This effect can occur once every 10 seconds.",
  icon: "/esoui/art/icons/ability_necromancer_008_a.dds",
  esoSkillId: 40118237,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/active",
  hashPlace: 86,
  createdAt: "2026-05-26T03:13:12.181Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Resolve (Constant)",
    "<<2>> = Minor Resolve (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 5948 (Constant)",
    "<<5>> = 2974 (Constant)",
    "<<6>> = 2 seconds (Constant)",
    "<<7>> = 15 seconds (Constant)",
    "<<8>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
