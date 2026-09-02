import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shadowCloak = {
  id: "01a05fd1-7cb7-7775-928f-130f514a82d6",
  pageTypeSlug: "temper-skill",
  slug: "shadow-cloak",
  title: "Shadow Cloak",
  key: "shadow-cloak",
  baseName: "Shadow Cloak",
  description:
    '"Cloak yourself in shadow to become invisible. When moving your Magicka Recovery is disabled and when not moving Shadow Cloak is half cost.\\n\\nWhen Shadow Cloak begins or ends, you gain Born From Shadow for |cffffff10|r seconds, increasing your damage done to monsters by |cffffff10|r%.\\n\\nWhile slotted on either bar, you gain Minor Protection, reducing your damage taken by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_nightblade_004.dds",
  esoSkillId: 25375,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
