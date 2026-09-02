import type { TemperSkill } from "../temper-skill.page-type.ts"

export const bloodMagic31383 = {
  id: "01a05fd0-436e-758a-8f4a-9474a5d8d7a6",
  pageTypeSlug: "temper-skill",
  slug: "blood-magic-31383",
  title: "Blood Magic",
  key: "blood-magic-31383",
  baseName: "Blood Magic",
  description:
    '"When you cast a Dark Magic ability with a cost, you heal for |cffffff1005|r Health if you are not at full Health. This portion of the ability scales off your Max Health.\\n\\nIf your Health is full, the higher of your Max Magicka or Stamina is increased by |cffffff5|r% for |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_026.dds",
  esoSkillId: 31383,
  isMorph: false,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "sorcerer-dark-magic",
  skillType: "passive",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
