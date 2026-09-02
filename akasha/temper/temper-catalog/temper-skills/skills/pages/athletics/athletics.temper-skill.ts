import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const athletics = {
  id: "01a05fd0-4353-7c34-a5ba-49640a68eff9",
  pageTypeSlug: "temper-skill",
  slug: "athletics",
  title: "Athletics",
  key: "athletics",
  baseName: "Athletics",
  description:
    '"Increases the Movement Speed bonus of Sprint by 3% for each piece of Medium Armor equipped.\\n\\nCurrent bonus: 0%.\\n\\nReduces the cost of Roll Dodge by 4% for each piece of Medium Armor equipped.\\n\\nCurrent bonus: 0%."',
  icon: "/esoui/art/icons/ability_armor_009.dds",
  esoSkillId: 45574,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 2,
  skillLineId: "armor-medium-armor",
  skillType: "passive",
  subcategoryId: "armor-medium-armor",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
