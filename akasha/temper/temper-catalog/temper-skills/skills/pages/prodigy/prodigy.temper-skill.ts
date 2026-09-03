import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const prodigy = {
  id: "019e6238-c2f9-7c9d-a159-a6bfbbbac5f1",
  pageTypeSlug: "temper-skill",
  slug: "prodigy",
  title: "Prodigy",
  key: "prodigy",
  baseName: "Prodigy",
  description:
    '"Increases your Weapon and Spell Critical rating by 219 for each piece of Light Armor equipped.\\n\\nCurrent bonus: 0."',
  icon: "/esoui/art/icons/ability_sorcerer_038.dds",
  esoSkillId: 45561,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 2,
  skillLineId: "armor-light-armor",
  skillType: "passive",
  subcategoryId: "armor-light-armor",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
