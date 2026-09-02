import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceMagmaArmor = {
  id: "01a05fd2-1e77-774b-b80b-8a05c10cefe6",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-magma-armor",
  title: "Vengeance Magma Armor",
  key: "vengeance-magma-armor",
  baseName: "Vengeance Magma Armor",
  description:
    '"Ignite the molten lava in your veins, limiting incoming damage to |cffffff3|r% of your Max Health for |cffffff15|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_018.dds",
  esoSkillId: 237790,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-earthen-heart",
  skillType: "ultimate",
  subcategoryId: "vengeance-dragonknight-earthen-heart",
} as const satisfies TemperSkill
