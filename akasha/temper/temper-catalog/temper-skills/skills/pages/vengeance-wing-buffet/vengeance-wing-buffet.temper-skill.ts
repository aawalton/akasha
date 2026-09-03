import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceWingBuffet = {
  id: "019e6f53-a9b4-764c-aef3-7ffdd13f9c4f",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-wing-buffet",
  title: "Vengeance Wing Buffet",
  key: "vengeance-wing-buffet",
  baseName: "Vengeance Wing Buffet",
  description:
    '"Flex your scales, reducing your damage taken from projectiles by |cffffff50|r% for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_008.dds",
  esoSkillId: 237639,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "vengeance-dragonknight-draconic-power",
} as const satisfies TemperSkill
