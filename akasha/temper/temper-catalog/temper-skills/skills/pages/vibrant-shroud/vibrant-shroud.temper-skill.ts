import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vibrantShroud = {
  id: "019e6245-a764-7a56-bc57-07920b18f1f6",
  pageTypeSlug: "temper-skill",
  slug: "vibrant-shroud",
  title: "Vibrant Shroud",
  key: "vibrant-shroud",
  baseName: "Encase",
  description:
    '"Call forth a Daedric shroud from the Colored Rooms to heal you and your allies and enfeeble foes in front of you. \\n\\nYou and allies in the area are healed for 2700 Health and receive Minor Vitality, increasing your healing received and damage shield strength by 6% for 10 seconds.\\n\\nEnemies are afflicted with Major Maim, reducing their damage done by 10% for 10 seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_crushing_winds.dds",
  esoSkillId: 30107,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
