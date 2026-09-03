import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const transfer = {
  id: "019e6245-a755-7ac1-9bc7-34e14c111f05",
  pageTypeSlug: "temper-skill",
  slug: "transfer",
  title: "Transfer",
  key: "transfer",
  baseName: "Transfer",
  description:
    '"Casting a Siphoning ability while in combat generates 2 Ultimate. This effect can occur once every 4 seconds."',
  icon: "/esoui/art/icons/passive_sorcerer_002.dds",
  esoSkillId: 45145,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "nightblade-siphoning",
  skillType: "passive",
  subcategoryId: "nightblade-siphoning",
  status: "unsupported",
} as const satisfies TemperSkill
