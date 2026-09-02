import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mediumArmorBonuses = {
  id: "01a05fd1-2dfa-7362-89bc-a646121afbcc",
  pageTypeSlug: "temper-skill",
  slug: "medium-armor-bonuses",
  title: "Medium Armor Bonuses",
  key: "medium-armor-bonuses",
  baseName: "Medium Armor Bonuses",
  description:
    '"Each piece of Medium Armor does the following:\\n\\nReduces the cost of Sprint by 1%\\n\\nReduces the cost of Sneak by 5%\\n\\nReduces the cost of Block by 3%\\n\\nReduces damage taken from Area of Effect attacks by 2% for 2 seconds after you use Roll Dodge\\n\\nIncreases Movement Speed by 2% while immune to crowd control"',
  icon: "/esoui/art/icons/passive_armor2_medium.dds",
  esoSkillId: 150181,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "armor-medium-armor",
  skillType: "passive",
  subcategoryId: "armor-medium-armor",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
