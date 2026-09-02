import type { TemperSkill } from "../temper-skill.page-type.ts"

export const resolve = {
  id: "01a05fd1-7c8f-79af-a0d4-abd3b1f9490f",
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
} as const satisfies TemperSkill
