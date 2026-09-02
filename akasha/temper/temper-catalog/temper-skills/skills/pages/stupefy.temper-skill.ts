import type { TemperSkill } from "../temper-skill.page-type.ts"

export const stupefy = {
  id: "01a05fd1-d249-7947-be21-fc0a2ab3ee0b",
  pageTypeSlug: "temper-skill",
  slug: "stupefy",
  title: "Stupefy",
  key: "stupefy",
  baseName: "Mesmerize",
  description:
    '"Subdue enemies in front of you with your baleful gaze, stunning them for 5 seconds if they are facing your direction.\\n\\nThis stun cannot be blocked.\\n\\nAfter the stun ends they remain stupefied, reducing their Movement Speed by 53% for 5 seconds."',
  icon: "/esoui/art/icons/ability_u26_vampire_04_b.dds",
  esoSkillId: 40138097,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 12,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
