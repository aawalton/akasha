import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const savageBeast = {
  id: "01a05fd1-7cb0-7c0b-8b86-c9bde3e61914",
  pageTypeSlug: "temper-skill",
  slug: "savage-beast",
  title: "Savage Beast",
  key: "savage-beast",
  baseName: "Savage Beast",
  description:
    '"Casting an Animal Companions ability while are in combat generates 4 Ultimate. This effect can occur once every 8 seconds."',
  icon: "/esoui/art/icons/passive_warden_009.dds",
  esoSkillId: 86063,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "warden-animal-companions",
  skillType: "passive",
  subcategoryId: "warden-animal-companions",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
