import type { TemperSkill } from "../temper-skill.page-type.ts"

export const agility = {
  id: "01a05fd0-4344-7aaf-99e5-a9a2ac78da97",
  pageTypeSlug: "temper-skill",
  slug: "agility",
  title: "Agility",
  key: "agility",
  baseName: "Agility",
  description:
    '"Increases your Weapon and Spell Damage by 2% for each piece of Medium Armor worn.\\n\\nCurrent bonus: 0%."',
  icon: "/esoui/art/icons/ability_armor_010.dds",
  esoSkillId: 45572,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 2,
  skillLineId: "armor-medium-armor",
  skillType: "passive",
  subcategoryId: "armor-medium-armor",
  status: "supported",
} as const satisfies TemperSkill
