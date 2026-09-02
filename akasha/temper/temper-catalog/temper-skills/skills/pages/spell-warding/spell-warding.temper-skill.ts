import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const spellWarding = {
  id: "01a05fd1-d23d-76fa-90ae-a0ceaaa01abc",
  pageTypeSlug: "temper-skill",
  slug: "spell-warding",
  title: "Spell Warding",
  key: "spell-warding",
  baseName: "Spell Warding",
  description:
    '"Increases your Spell Resistance by 726 for each piece of Light Armor equipped. \\n\\nCurrent bonus: 0."',
  icon: "/esoui/art/icons/ability_armor_006.dds",
  esoSkillId: 45559,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 2,
  skillLineId: "armor-light-armor",
  skillType: "passive",
  subcategoryId: "armor-light-armor",
  status: "supported",
} as const satisfies TemperSkill
