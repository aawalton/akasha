import type { TemperSkill } from "../temper-skill.page-type.ts"

export const revitalize = {
  id: "01a05fd1-7c99-7fa2-8d23-a68220c1e8eb",
  pageTypeSlug: "temper-skill",
  slug: "revitalize",
  title: "Revitalize",
  key: "revitalize",
  baseName: "Revitalize",
  description:
    '"Increases the Magicka or Stamina your Heavy Attacks restore by 4% for each piece of Heavy Armor worn.\\n\\nCurrent bonus: 0%"',
  icon: "/esoui/art/icons/ability_armor_013.dds",
  esoSkillId: 45528,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 2,
  skillLineId: "armor-heavy-armor",
  skillType: "passive",
  subcategoryId: "armor-heavy-armor",
  status: "unsupported",
} as const satisfies TemperSkill
