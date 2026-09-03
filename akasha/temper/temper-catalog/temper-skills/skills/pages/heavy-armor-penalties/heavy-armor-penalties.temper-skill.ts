import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const heavyArmorPenalties = {
  id: "019e6238-c2c6-7ff2-9386-69f4ee54b396",
  pageTypeSlug: "temper-skill",
  slug: "heavy-armor-penalties",
  title: "Heavy Armor Penalties",
  key: "heavy-armor-penalties",
  baseName: "Heavy Armor Penalties",
  description:
    '"Each piece of Heavy Armor does the following:\\n\\nIncreases damage taken from Magical attacks by 1%\\n\\nReduces the Movement Speed bonus of Sprint by 1%\\n\\nIncreases the cost of Roll Dodge by 3%\\n\\nIncreases the size of your detection area while Sneaking by 10%"',
  icon: "/esoui/art/icons/passive_armor2_heavy.dds",
  esoSkillId: 152780,
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
