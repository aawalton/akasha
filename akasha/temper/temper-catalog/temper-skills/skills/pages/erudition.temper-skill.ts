import type { TemperSkill } from "../temper-skill.page-type.ts"

export const erudition = {
  id: "01a05fd0-8e23-7ed5-92a0-99020e252944",
  pageTypeSlug: "temper-skill",
  slug: "erudition",
  title: "Erudition",
  key: "erudition",
  baseName: "Erudition",
  description:
    '"Knowledge is power. Your excessive scholarship increases your Magicka and Stamina Recovery by 18%."',
  icon: "/esoui/art/icons/passive_arcanist_11.dds",
  esoSkillId: 185239,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "passive",
  subcategoryId: "arcanist-curative-runeforms",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
