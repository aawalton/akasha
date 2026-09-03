import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const continuousAttack = {
  id: "019e6251-4ca2-7820-9681-cae6311c678d",
  pageTypeSlug: "temper-skill",
  slug: "continuous-attack",
  title: "Continuous Attack",
  key: "continuous-attack",
  baseName: "Continuous Attack",
  description:
    '"Increases your Weapon and Spell Damage by 10% and Health, Magicka, and Stamina Recovery by 20% for 10 minutes after you capture a Lumber Mill, Farm, Mine, or Keep.\\n\\nGain Gallop at all times, increasing your Mount Speed by 15%."',
  icon: "/esoui/art/icons/ability_weapon_028.dds",
  esoSkillId: 45614,
  isMorph: false,
  learnedLevel: 9,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 2,
  skillLineId: "alliance-war-assault",
  skillType: "passive",
  subcategoryId: "alliance-war-assault",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
