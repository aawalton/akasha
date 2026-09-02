import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const deepFissure = {
  id: "01a05fd0-8e03-7f98-b306-a0e2883a1429",
  pageTypeSlug: "temper-skill",
  slug: "deep-fissure",
  title: "Deep Fissure",
  key: "deep-fissure",
  baseName: "Scorch",
  description:
    '"Stir a group of shalk that attack after 3 seconds, dealing 2591 Magic Damage to enemies in front of you.\\n\\nAfter the shalk complete their attack, they burrow underground for 6 seconds and then resurface again, dealing 3600 Magic Damage to enemies in front of you.\\n\\nEnemies damaged are afflicted with Major and Minor Breach, reducing their Physical and Spell Resistance by 5948 and 2974 for 10 seconds."',
  icon: "/esoui/art/icons/ability_warden_015_a.dds",
  esoSkillId: 93778,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
