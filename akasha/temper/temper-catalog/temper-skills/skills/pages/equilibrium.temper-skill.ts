import type { TemperSkill } from "../temper-skill.page-type.ts"

export const equilibrium = {
  id: "01a05fd0-8e23-7fe1-b386-a950faf8047e",
  pageTypeSlug: "temper-skill",
  slug: "equilibrium",
  title: "Equilibrium",
  key: "equilibrium",
  baseName: "Equilibrium",
  description:
    '"Barter with Oblivion to trade vitality for power, sacrificing your Health in exchange for |cffffff3000|r Magicka.\\n\\nThe exchange reduces your healing done and damage shield strength by |cffffff50|r% for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_mageguild_003.dds",
  esoSkillId: 31642,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "guild-mages-guild",
  skillType: "active",
  subcategoryId: "guild-mages-guild",
} as const satisfies TemperSkill
