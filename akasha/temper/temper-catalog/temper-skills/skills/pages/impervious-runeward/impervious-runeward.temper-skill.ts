import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const imperviousRuneward = {
  id: "019e6245-a6b0-74ad-a17b-03dd6782ba35",
  pageTypeSlug: "temper-skill",
  slug: "impervious-runeward",
  title: "Impervious Runeward",
  key: "impervious-runeward",
  baseName: "Runespite Ward",
  description:
    '"Like the rune knights of old, summon a shield that absorbs 9916 damage for 1 second, and then 2203 damage for 5 seconds if the first shield persists. Both shields scale off your Max Health.\\n\\nThe first time you take direct damage, the shield retaliates and deals 0 Magic Damage to the attacker, scaling off your Armor.\\n\\nConsume Crux to heal yourself for 1600 Health, scaling off your Max Health, per Crux spent."',
  icon: "/esoui/art/icons/ability_arcanist_008_b.dds",
  esoSkillId: 40183241,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
