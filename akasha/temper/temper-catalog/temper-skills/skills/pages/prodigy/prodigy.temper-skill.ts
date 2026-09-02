import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const prodigy = {
  id: "01a05fd1-2e1d-770a-bec2-57c9fbb3fbb2",
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
} as const satisfies TemperSkill
