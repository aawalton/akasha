import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const engraver = {
  id: "01a05fd0-8e22-72a3-81b2-30759f889d00",
  pageTypeSlug: "temper-skill",
  slug: "engraver",
  title: "Engraver",
  key: "engraver",
  baseName: "Engraver",
  description: '"Allows the use of Platinum Ounces."',
  icon: "/esoui/art/icons/passive_jewelerengraver.dds",
  esoSkillId: 103636,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 5,
  skillLineId: "craft-jewelry-crafting",
  skillType: "passive",
  subcategoryId: "craft-jewelry-crafting",
} as const satisfies TemperSkill
