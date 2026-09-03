import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const dragonLeap = {
  id: "019e6f53-a0e5-7595-ba78-0c8095515409",
  pageTypeSlug: "temper-skill",
  slug: "dragon-leap",
  title: "Dragon Leap",
  key: "dragon-leap",
  baseName: "Dragon Leap",
  description:
    '"Launch yourself at an enemy, dealing |cffffff13129|r Flame Damage to all enemies in the area, knocking players back |cffffff4|r meters and stunning them for |cffffff2|r seconds. If the target is a monster they are instead knocked into the air and stunned for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_009.dds",
  esoSkillId: 29012,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "dragonknight-draconic-power",
  skillType: "ultimate",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
