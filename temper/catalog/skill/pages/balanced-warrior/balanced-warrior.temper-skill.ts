import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const balancedWarrior = {
  id: "019e6245-a5f1-7d6c-8b13-22bb9774ebb9",
  type: "page-type/temper-skill",
  slug: "balanced-warrior",
  title: "Balanced Warrior",
  key: "balanced-warrior",
  baseName: "Balanced Warrior",
  description:
    "Increases your Armor for each Templar ability slotted.\n\nIncreases your Weapon and Spell Damage based on your total Armor and number of Templar abilities slotted.",
  icon: "/esoui/art/icons/ability_templar_032.dds",
  esoSkillId: 44732,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
  hashPlace: 71,
  createdAt: "2026-05-26T03:13:12.177Z",
  updatedAt: "2026-10-20T15:34:50.678Z",
  equations: [
    "<<1>> = 2% (Constant)",
    "<<2>> = 0.0079731 MaxResist - 0.172379 (Max Resistance, SingleTarget, Direct, R2 = 0.999949)",
  ],
} as const satisfies TemperSkill
