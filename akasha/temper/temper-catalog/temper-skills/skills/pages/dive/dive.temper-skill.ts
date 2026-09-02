import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const dive = {
  id: "01a05fd0-8e0e-7998-b875-9c665367085b",
  pageTypeSlug: "temper-skill",
  slug: "dive",
  title: "Dive",
  key: "dive",
  baseName: "Dive",
  description:
    '"Command a cliff racer to dive bomb an enemy, dealing |cffffff7269|r Magic Damage.\\n\\nIf you are more than |cffffff7|r meters away from the target, you set them Off Balance for |cffffff7|r seconds."',
  icon: "/esoui/art/icons/ability_warden_013.dds",
  esoSkillId: 85995,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
