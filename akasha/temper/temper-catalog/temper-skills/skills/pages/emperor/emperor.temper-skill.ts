import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const emperor = {
  id: "01a05fd0-8e1c-7eb3-bff1-3e02ee937ebf",
  pageTypeSlug: "temper-skill",
  slug: "emperor",
  title: "Emperor",
  key: "emperor",
  baseName: "Emperor",
  description:
    '"Increases your Max Health, Magicka, and Stamina while in your campaign, depending on how many Home Keeps you own.\\n\\n1 or less Keep: 38%\\n2 Keeps: 45%\\n3 Keeps: 53%\\n4 Keeps: 60%\\n5 Keeps: 68%\\n6 Keeps: 75%"',
  icon: "/esoui/art/icons/ability_sorcerer_045.dds",
  esoSkillId: 39641,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "alliance-war-emperor",
  skillType: "passive",
  subcategoryId: "alliance-war-emperor",
  status: "unsupported",
} as const satisfies TemperSkill
