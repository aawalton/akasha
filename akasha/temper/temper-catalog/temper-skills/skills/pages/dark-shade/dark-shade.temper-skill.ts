import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const darkShade = {
  id: "019e6245-a63d-770e-b60b-61e5b0eb6a7e",
  pageTypeSlug: "temper-skill",
  slug: "dark-shade",
  title: "Dark Shade",
  key: "dark-shade",
  baseName: "Summon Shade",
  description:
    '"Summon a shade version of yourself to attack an enemy and fight at your side for 20 seconds. \\n\\nThe shade attacks nearby enemies within 9 meters of it, dealing 623 Magic Damage once every 2 seconds and afflicting them with Minor Maim for 4 seconds, reducing their damage done by 5%."',
  icon: "/esoui/art/icons/ability_nightblade_001_a.dds",
  esoSkillId: 36283,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
