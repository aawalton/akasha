import type { TemperSkill } from "../temper-skill.page-type.ts"

export const heavyArmorBonuses = {
  id: "01a05fd0-dcb0-7c87-8569-bd3c21fb1240",
  pageTypeSlug: "temper-skill",
  slug: "heavy-armor-bonuses",
  title: "Heavy Armor Bonuses",
  key: "heavy-armor-bonuses",
  baseName: "Heavy Armor Bonuses",
  description:
    '"Each piece of Heavy Armor does the following:\\n\\nReduces damage taken from Martial attacks by 1%\\n\\nIncreases the amount of damage blocked by 1%\\n\\nIncreases damage done with Bash by 30\\n\\nReduces your damage taken while immune to crowd control by 1%"',
  icon: "/esoui/art/icons/passive_armor2_heavy.dds",
  esoSkillId: 150184,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "armor-heavy-armor",
  skillType: "passive",
  subcategoryId: "armor-heavy-armor",
  status: "partially-supported",
} as const satisfies TemperSkill
