import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const resolve = {
  id: "019e6238-c302-724c-8167-e37fba8feae0",
  pageTypeSlug: "temper-skill",
  slug: "resolve",
  title: "Resolve",
  key: "resolve",
  baseName: "Resolve",
  description:
    '"Increases your Physical and Spell Resistance by 343 for each piece of Heavy Armor equipped.\\n\\nCurrent bonus: 0."',
  icon: "/esoui/art/icons/ability_dragonknight_020.dds",
  esoSkillId: 45533,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 3,
  skillLineId: "armor-heavy-armor",
  skillType: "passive",
  subcategoryId: "armor-heavy-armor",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
