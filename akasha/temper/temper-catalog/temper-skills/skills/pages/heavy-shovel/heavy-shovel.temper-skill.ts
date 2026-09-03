import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const heavyShovel = {
  id: "019e6251-4cbd-78db-a21e-aa162f344cb1",
  pageTypeSlug: "temper-skill",
  slug: "heavy-shovel",
  title: "Heavy Shovel",
  key: "heavy-shovel",
  baseName: "Heavy Shovel",
  description:
    '"Removes 1 layer of dirt and rocks from up to a 3x3 area.\\n\\nThe shovel only affects a single contiguous height of dirt and rocks.\\n\\nCosts 2 Intuition to use.\\nHas a chance to consume no Intuition on use."',
  icon: "/esoui/art/icons/u26_ability_digging_02.dds",
  esoSkillId: 139907,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-excavation",
  skillType: "passive",
  subcategoryId: "world-excavation",
} as const satisfies TemperSkill
