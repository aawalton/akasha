import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const sleetStorm = {
  id: "01a05fd1-7ccc-73d6-af1a-57076b607269",
  pageTypeSlug: "temper-skill",
  slug: "sleet-storm",
  title: "Sleet Storm",
  key: "sleet-storm",
  baseName: "Sleet Storm",
  description:
    '"Twist a violent storm around you, dealing |cffffff4036|r Frost Damage every |cffffff1|r second for |cffffff8|r seconds to enemies around you and reducing their Movement Speed by |cffffff40|r%.  \\n\\nYou and nearby allies gain Major Protection, reducing your damage taken by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_warden_006.dds",
  esoSkillId: 86109,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "warden-winters-embrace",
  skillType: "ultimate",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
