import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const magmaArmor = {
  id: "019e6f53-a446-73e9-820c-d5943717772d",
  pageTypeSlug: "temper-skill",
  slug: "magma-armor",
  title: "Magma Armor",
  key: "magma-armor",
  baseName: "Magma Armor",
  description:
    '"Ignite the molten lava in your veins, limiting incoming damage to |cffffff3|r% of your Max Health for |cffffff15|r seconds.\\n\\nWhile active, you cannot generate Ultimate."',
  icon: "/esoui/art/icons/ability_dragonknight_018.dds",
  esoSkillId: 15957,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "ultimate",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
