import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shadowyDisguise = {
  id: "01a05fd1-7cb9-719e-b9f4-212e98956eb3",
  pageTypeSlug: "temper-skill",
  slug: "shadowy-disguise",
  title: "Shadowy Disguise",
  key: "shadowy-disguise",
  baseName: "Shadow Cloak",
  description:
    '"Cloak yourself in shadow to become invisible. When moving your Magicka Recovery is disabled and when not moving Shadowy Disguise is half cost. Your next direct damage attack will Critically Strike.\\n\\nWhen Shadowy Disguise begins or ends, you gain Born From Shadow for 10 seconds, increasing your damage done to monsters by 10%.\\n\\nWhile slotted on either bar, you gain Minor Protection, reducing your damage taken by 5%."',
  icon: "/esoui/art/icons/ability_nightblade_004_a.dds",
  esoSkillId: 36368,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
