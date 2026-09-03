import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const heartOfStone = {
  id: "019e6f53-a2fa-77ec-ac11-b9ea9f81fcf8",
  pageTypeSlug: "temper-skill",
  slug: "heart-of-stone",
  title: "Heart of Stone",
  key: "heart-of-stone",
  baseName: "Heart of Stone",
  description:
    '"Rock and stone shield your heart, turning aside sharp blades and barbed words.\\n\\nIncreases your Armor by |cffffff1487|r."',
  icon: "/esoui/art/icons/ability_dragonknight_032.dds",
  esoSkillId: 29468,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "passive",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
