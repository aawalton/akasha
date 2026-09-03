import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const undauntedCommand = {
  id: "019e6238-c328-78c6-9ff4-12421f8ce619",
  pageTypeSlug: "temper-skill",
  slug: "undaunted-command",
  title: "Undaunted Command",
  key: "undaunted-command",
  baseName: "Undaunted Command",
  description:
    '"Activating a synergy restores 4% of your Max Health, Stamina, and Magicka.\\n\\nCurrent Bonus: 640 Health, 480 Stamina, and 480 Magicka."',
  icon: "/esoui/art/icons/ability_templar_003.dds",
  esoSkillId: 55676,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 2,
  skillLineId: "guild-undaunted",
  skillType: "passive",
  subcategoryId: "guild-undaunted",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
