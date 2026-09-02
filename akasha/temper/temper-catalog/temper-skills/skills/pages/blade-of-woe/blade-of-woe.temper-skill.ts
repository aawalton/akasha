import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bladeOfWoe = {
  id: "01a05fd0-4364-78db-8ea6-66ab8166e0f3",
  pageTypeSlug: "temper-skill",
  slug: "blade-of-woe",
  title: "Blade of Woe",
  key: "blade-of-woe",
  baseName: "Blade of Woe",
  description:
    '"Call the weapon of the Dark Brotherhood to your hand and deliver a killing blow to an unsuspecting target. Experience from this target is reduced by 75%.\\n\\nThis ability does not work on players or difficult targets."',
  icon: "/esoui/art/icons/ability_darkbrotherhood_passive_001.dds",
  esoSkillId: 78219,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-dark-brotherhood",
  skillType: "passive",
  subcategoryId: "guild-dark-brotherhood",
  status: "unsupported",
} as const satisfies TemperSkill
