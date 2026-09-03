import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const heavyArmorBonuses = {
  id: "019e6238-c2c5-7b17-86e4-790aab88de91",
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
  effects: "jsonl",
} as const satisfies TemperSkill
