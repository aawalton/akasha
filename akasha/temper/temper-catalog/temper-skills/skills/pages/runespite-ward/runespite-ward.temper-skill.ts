import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runespiteWard = {
  id: "01a05fd1-7ca8-7a17-9fa5-23f842fc1b15",
  pageTypeSlug: "temper-skill",
  slug: "runespite-ward",
  title: "Runespite Ward",
  key: "runespite-ward",
  baseName: "Runespite Ward",
  description:
    '"Like the rune knights of old, summon a shield that absorbs |cffffff6802|r damage for |cffffff6|r seconds, scaling off your Max Health.\\n\\nThe first time you take direct damage, the shield retaliates and deals |cffffff1949|r Magic Damage to the attacker, scaling off your Armor.\\n\\nConsume Crux to heal yourself for |cffffff2010|r Health, scaling off your Max Health, per Crux spent."',
  icon: "/esoui/art/icons/ability_arcanist_008.dds",
  esoSkillId: 185894,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
