import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const spellRecharge = {
  id: "019e624a-12e0-73a6-85fb-26d3108403f8",
  pageTypeSlug: "temper-skill",
  slug: "spell-recharge",
  title: "Spell Recharge",
  key: "spell-recharge",
  baseName: "Spell Recharge",
  description:
    '"When you activate an ability, you restore 625 Magicka or Stamina, based on whichever is lowest. This effect can occur once every 6 seconds.\\n\\nWhen you are using an ability with a channel or cast time, you take 5% less damage."',
  icon: "/esoui/art/icons/ability_sorcerer_063.dds",
  esoSkillId: 45274,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-high-elf-skills",
  skillType: "passive",
  subcategoryId: "racial-high-elf-skills",
  status: "unsupported",
} as const satisfies TemperSkill
