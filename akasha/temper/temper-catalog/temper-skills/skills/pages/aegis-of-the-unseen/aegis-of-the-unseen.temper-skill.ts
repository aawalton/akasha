import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const aegisOfTheUnseen = {
  id: "019e6245-a5e7-75e0-986b-a13cb79931ab",
  pageTypeSlug: "temper-skill",
  slug: "aegis-of-the-unseen",
  title: "Aegis of the Unseen",
  key: "aegis-of-the-unseen",
  baseName: "Aegis of the Unseen",
  description:
    '"Form a secret soldier within your mind, a defense against arcane forces without. While a beneficial Soldier of Apocrypha ability is active on you, increase your Armor by 3271."',
  icon: "/esoui/art/icons/passive_arcanist_05.dds",
  esoSkillId: 184923,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "passive",
  subcategoryId: "arcanist-soldier-of-apocrypha",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
