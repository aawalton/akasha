import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const spellRecharge35993 = {
  id: "01a05fd1-7cd9-73f5-b2bf-fb22df984c84",
  pageTypeSlug: "temper-skill",
  slug: "spell-recharge-35993",
  title: "Spell Recharge",
  key: "spell-recharge-35993",
  baseName: "Spell Recharge",
  description:
    '"When you activate an ability, you restore |cffffff200|r Magicka or Stamina, based on whichever is lowest. This effect can occur once every |cffffff6|r seconds.\\n\\nWhen you are using an ability with a channel or cast time, you take |cffffff1|r% less damage."',
  icon: "/esoui/art/icons/ability_sorcerer_063.dds",
  esoSkillId: 35993,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "racial-high-elf-skills",
  skillType: "passive",
  subcategoryId: "racial-high-elf-skills",
} as const satisfies TemperSkill
