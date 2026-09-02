import type { TemperSkill } from "../temper-skill.page-type.ts"

export const felineAmbush = {
  id: "01a05fd0-dc88-7ddc-89f4-0afbb69cf244",
  pageTypeSlug: "temper-skill",
  slug: "feline-ambush",
  title: "Feline Ambush",
  key: "feline-ambush",
  baseName: "Feline Ambush",
  description:
    '"Increases your Critical Damage and Critical Healing by 12%.\\n\\nDecreases your detection radius in Stealth by 3 meters."',
  icon: "/esoui/art/icons/ability_armor_006.dds",
  esoSkillId: 45301,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-khajiit-skills",
  skillType: "passive",
  subcategoryId: "racial-khajiit-skills",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
