import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceDive = {
  id: "01a05fd1-d299-7415-9764-2b173f1edf55",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-dive",
  title: "Vengeance Dive",
  key: "vengeance-dive",
  baseName: "Vengeance Dive",
  description:
    '"Command a cliff racer to dive bomb an enemy, dealing |cffffff10017|r Magic Damage. \\n\\nThis ability cannot be blocked."',
  icon: "/esoui/art/icons/ability_warden_013.dds",
  esoSkillId: 238000,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-animal-companions",
  skillType: "active",
  subcategoryId: "vengeance-warden-animal-companions",
} as const satisfies TemperSkill
