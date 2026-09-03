import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const boundArmor = {
  id: "019e6f53-9f80-73f7-8c23-5a00935f0ab2",
  pageTypeSlug: "temper-skill",
  slug: "bound-armor",
  title: "Bound Armor",
  key: "bound-armor",
  baseName: "Bound Armor",
  description:
    '"Protect yourself with the power of Oblivion, creating a suit of Daedric mail that increases your block mitigation by |cffffff36|r% for |cffffff3|r seconds. The duration is based on your combined Physical and Spell Resistance.\\n\\nWhile slotted on either ability bar, you gain Minor Protection, reducing your damage taken by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_sorcerer_bound_armor.dds",
  esoSkillId: 24158,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
