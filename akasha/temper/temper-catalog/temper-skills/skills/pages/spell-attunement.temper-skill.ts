import type { TemperSkill } from "../temper-skill.page-type.ts"

export const spellAttunement = {
  id: "01a05fd1-7cd8-73fa-8637-8f2c45e63dcd",
  pageTypeSlug: "temper-skill",
  slug: "spell-attunement",
  title: "Spell Attunement",
  key: "spell-attunement",
  baseName: "Spell Attunement",
  description:
    '"Increases your Spell Resistance by 2310. This effect is doubled if you are afflicted with Burning, Chilled, or Concussed.  \\n\\nIncreases your Magicka Recovery by 130."',
  icon: "/esoui/art/icons/ability_sorcerer_013.dds",
  esoSkillId: 45262,
  isMorph: false,
  learnedLevel: 40,
  lineRankNeeded: 40,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-breton-skills",
  skillType: "passive",
  subcategoryId: "racial-breton-skills",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
