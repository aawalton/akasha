import type { TemperSkill } from "../temper-skill.page-type.ts"

export const daedricProtection = {
  id: "01a05fd0-8df6-712c-b265-55cccb5b86a4",
  pageTypeSlug: "temper-skill",
  slug: "daedric-protection",
  title: "Daedric Protection",
  key: "daedric-protection",
  baseName: "Daedric Protection",
  description:
    '"Reduce your damage taken by 5% while you have a Daedric Summoning ability active."',
  icon: "/esoui/art/icons/ability_sorcerer_022.dds",
  esoSkillId: 45200,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "passive",
  subcategoryId: "sorcerer-daedric-summoning",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
