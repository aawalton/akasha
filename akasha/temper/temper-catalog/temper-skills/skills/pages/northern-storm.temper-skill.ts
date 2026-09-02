import type { TemperSkill } from "../temper-skill.page-type.ts"

export const northernStorm = {
  id: "01a05fd1-2e08-7c44-9539-0c5618969b36",
  pageTypeSlug: "temper-skill",
  slug: "northern-storm",
  title: "Northern Storm",
  key: "northern-storm",
  baseName: "Sleet Storm",
  description:
    '"Twist a violent storm around you, dealing 1199 Frost Damage every 1 second for 8 seconds to enemies around you and reducing their Movement Speed by 40%. As the storm holds, your damage done increases by 2% every 1 second for 12 seconds, up to 9 stacks max.\\n\\nYou and nearby allies gain Major Protection, reducing your damage taken by 10%."',
  icon: "/esoui/art/icons/ability_warden_006_a.dds",
  esoSkillId: 86116,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-winters-embrace",
  skillType: "ultimate",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
