import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mesmerize = {
  id: "01a05fd1-2dfc-7a66-9b56-aac0ba113890",
  pageTypeSlug: "temper-skill",
  slug: "mesmerize",
  title: "Mesmerize",
  key: "mesmerize",
  baseName: "Mesmerize",
  description:
    '"Subdue enemies in front of you with your baleful gaze, stunning them for |cffffff5|r seconds if they are facing your direction.\\n\\nThis stun cannot be blocked."',
  icon: "/esoui/art/icons/ability_u26_vampire_04.dds",
  esoSkillId: 128709,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
