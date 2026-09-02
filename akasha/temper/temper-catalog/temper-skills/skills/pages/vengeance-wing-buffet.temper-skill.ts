import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceWingBuffet = {
  id: "01a05fd2-1e90-759e-88d2-ebbdbe31e757",
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
