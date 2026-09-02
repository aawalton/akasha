import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hypnosis = {
  id: "01a05fd0-dcb9-723b-826e-0dd38a561c25",
  pageTypeSlug: "temper-skill",
  slug: "hypnosis",
  title: "Hypnosis",
  key: "hypnosis",
  baseName: "Mesmerize",
  description:
    '"Subdue enemies around you with your baleful gaze, stunning them for 5 seconds if they are facing your direction.\\n\\nThis stun cannot be blocked."',
  icon: "/esoui/art/icons/ability_u26_vampire_04_a.dds",
  esoSkillId: 40137861,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 8,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
