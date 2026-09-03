import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const takeFlight32719 = {
  id: "019e6f53-a81d-7295-a563-ffe6be1fc181",
  pageTypeSlug: "temper-skill",
  slug: "take-flight-32719",
  title: "Take Flight",
  key: "take-flight-32719",
  baseName: "Dragon Leap",
  description:
    '"Launch yourself at an enemy, dealing |cffffff15079|r Flame Damage to all enemies in the area, knocking them back |cffffff4|r meters, and stunning them for |cffffff2|r seconds. If the target is a monster they are instead knocked into the air and stunned for |cffffff3|r seconds.\\n\\nUpon activation you are filled with draconic fury for |cffffff15|r seconds, increasing your damage done by |cffffff10|r%. This effect\'s potency doubles against monsters."',
  icon: "/esoui/art/icons/ability_dragonknight_009_b.dds",
  esoSkillId: 32719,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "dragonknight-draconic-power",
  skillType: "ultimate",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
