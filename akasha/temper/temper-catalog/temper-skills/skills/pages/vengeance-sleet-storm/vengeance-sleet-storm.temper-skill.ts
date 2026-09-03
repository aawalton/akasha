import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSleetStorm = {
  id: "019e6f53-a989-74ac-bf39-0dfedba24a93",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-sleet-storm",
  title: "Vengeance Sleet Storm",
  key: "vengeance-sleet-storm",
  baseName: "Vengeance Sleet Storm",
  description:
    '"Twist a violent storm around you, stunning up to 6 nearby enemies for |cffffff4|r seconds and reducing their Movement Speed by |cffffff40|r% for |cffffff4|r seconds after the stun ends. \\n\\nYou gain Major Protection for |cffffff8|r seconds, reducing your damage taken by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_warden_006.dds",
  esoSkillId: 238098,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-winters-embrace",
  skillType: "ultimate",
  subcategoryId: "vengeance-warden-winters-embrace",
} as const satisfies TemperSkill
