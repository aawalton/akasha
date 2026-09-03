import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shadowBarrier = {
  id: "019e6245-a728-779c-900b-74e2fe075bf2",
  pageTypeSlug: "temper-skill",
  slug: "shadow-barrier",
  title: "Shadow Barrier",
  key: "shadow-barrier",
  baseName: "Shadow Barrier",
  description:
    '"Casting a Shadow ability grants you Major Resolve for 12 seconds, increasing your Physical and Spell Resistance by 5948. This duration is increased by 2 seconds for each piece of Heavy Armor equipped.\\n\\nCurrent duration: 12 seconds"',
  icon: "/esoui/art/icons/ability_sorcerer_022.dds",
  esoSkillId: 45071,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "nightblade-shadow",
  skillType: "passive",
  subcategoryId: "nightblade-shadow",
  status: "unsupported",
} as const satisfies TemperSkill
