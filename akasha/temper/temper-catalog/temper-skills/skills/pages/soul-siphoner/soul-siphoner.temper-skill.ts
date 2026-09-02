import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulSiphoner = {
  id: "01a05fd1-7cd4-7ff7-8728-81361545c1e0",
  pageTypeSlug: "temper-skill",
  slug: "soul-siphoner",
  title: "Soul Siphoner",
  key: "soul-siphoner",
  baseName: "Soul Siphoner",
  description:
    '"Increases your healing done by 3% for each Siphoning ability slotted. \\n\\nCurrent bonus: 0%."',
  icon: "/esoui/art/icons/passive_sorcerer_036.dds",
  esoSkillId: 45155,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "nightblade-siphoning",
  skillType: "passive",
  subcategoryId: "nightblade-siphoning",
  status: "supported",
} as const satisfies TemperSkill
