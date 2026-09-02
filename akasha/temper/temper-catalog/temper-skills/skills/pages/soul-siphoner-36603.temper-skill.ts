import type { TemperSkill } from "../temper-skill.page-type.ts"

export const soulSiphoner36603 = {
  id: "01a05fd1-7cd4-740c-8b81-645534b734c4",
  pageTypeSlug: "temper-skill",
  slug: "soul-siphoner-36603",
  title: "Soul Siphoner",
  key: "soul-siphoner-36603",
  baseName: "Soul Siphoner",
  description:
    '"Increases your healing done by |cffffff1|r% for each Siphoning ability slotted. \\n\\nCurrent bonus: |cffffff0|r%."',
  icon: "/esoui/art/icons/passive_sorcerer_036.dds",
  esoSkillId: 36603,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "nightblade-siphoning",
  skillType: "passive",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
