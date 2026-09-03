import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const balancedWarrior = {
  id: "019e6245-a5f1-7d6c-8b13-22bb9774ebb9",
  pageTypeSlug: "temper-skill",
  slug: "balanced-warrior",
  title: "Balanced Warrior",
  key: "balanced-warrior",
  baseName: "Balanced Warrior",
  description: '"Increases your Weapon Damage, Spell Damage, and Armor by 6%."',
  icon: "/esoui/art/icons/ability_templar_032.dds",
  esoSkillId: 44732,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 2,
  skillLineId: "templar-aedric-spear",
  skillType: "passive",
  subcategoryId: "templar-aedric-spear",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
