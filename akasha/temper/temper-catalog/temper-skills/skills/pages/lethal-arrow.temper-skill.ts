import type { TemperSkill } from "../temper-skill.page-type.ts"

export const lethalArrow = {
  id: "01a05fd0-dcd5-75bb-a4bd-ce337c85f70e",
  pageTypeSlug: "temper-skill",
  slug: "lethal-arrow",
  title: "Lethal Arrow",
  key: "lethal-arrow",
  baseName: "Snipe",
  description:
    '"Plant a masterfully aimed arrow in an enemy\'s vital spot, dealing 2483 Poison Damage and applying the Poisoned status effect.\\n\\nAlso afflicts enemy with Minor Defile, which reduces their healing received and damage shield strength by 6% for 4 seconds."',
  icon: "/esoui/art/icons/ability_bow_001_a.dds",
  esoSkillId: 40897,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
