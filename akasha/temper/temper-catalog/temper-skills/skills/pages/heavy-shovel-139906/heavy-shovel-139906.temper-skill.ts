import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const heavyShovel139906 = {
  id: "019e6f53-a304-7e52-af7e-3da172003f6a",
  pageTypeSlug: "temper-skill",
  slug: "heavy-shovel-139906",
  title: "Heavy Shovel",
  key: "heavy-shovel-139906",
  baseName: "Heavy Shovel",
  description:
    '"Removes |cFFFFFF1|r layer of dirt and rocks from up to a |cFFFFFF3x3|r area.\\n\\nThe shovel only affects a single contiguous height of dirt and rocks.\\n\\nCosts |c19D3FF2 Intuition|r to use."',
  icon: "/esoui/art/icons/u26_ability_digging_02.dds",
  esoSkillId: 139906,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "world-excavation",
  skillType: "passive",
  subcategoryId: "world-excavation",
} as const satisfies TemperSkill
