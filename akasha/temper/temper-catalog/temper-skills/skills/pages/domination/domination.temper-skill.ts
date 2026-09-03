import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const domination = {
  id: "019e6251-4ca9-7658-9a4f-7e06d38645e6",
  pageTypeSlug: "temper-skill",
  slug: "domination",
  title: "Domination",
  key: "domination",
  baseName: "Domination",
  description:
    '"Increases your Health, Magicka, and Stamina Recovery while in your campaign, depending on how many Home Keeps you own.\\n\\n1 or less Keep: 50%\\n2 Keeps: 60%\\n3 Keeps: 70%\\n4 Keeps: 80%\\n5 Keeps: 90%\\n6 Keeps: 100%"',
  icon: "/esoui/art/icons/ability_sorcerer_038.dds",
  esoSkillId: 39644,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "alliance-war-emperor",
  skillType: "passive",
  subcategoryId: "alliance-war-emperor",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
