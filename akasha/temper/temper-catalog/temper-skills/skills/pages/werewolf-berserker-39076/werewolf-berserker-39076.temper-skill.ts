import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const werewolfBerserker39076 = {
  id: "019e6f53-a9e5-750a-a40e-92e4951adfc4",
  pageTypeSlug: "temper-skill",
  slug: "werewolf-berserker-39076",
  title: "Werewolf Berserker",
  key: "werewolf-berserker-39076",
  baseName: "Werewolf Transformation",
  description:
    '"Transform into a berserk beast, fearing nearby enemies for |cffffff3|r seconds.\\n\\nWhile transformed, you gain Major Berserk and your Light Attacks and Heavy Attacks apply a bleed for |cffffff3978|r Bleed Damage over |cffffff4|r seconds, or |cffffff1989|r Bleed Damage after |cffffff1|r second against players.\\n\\nWhile transformed and in combat, abilities generate Fury. When you have |cffffff1000|r, this ability becomes Rampage, which increases your damage done, Movement Speed, and removes the cost of Werewolf abilities for |cffffff20|r seconds.\\n\\nWhile slotted, your Stamina Recovery is increased by |cffffff15|r%."',
  icon: "/esoui/art/icons/ability_werewolf_001_b.dds",
  esoSkillId: 39076,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "world-werewolf",
  skillType: "ultimate",
  subcategoryId: "world-werewolf",
} as const satisfies TemperSkill
