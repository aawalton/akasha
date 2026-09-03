import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bloodMagic = {
  id: "019e6245-a5fd-7845-b9e1-625c5eefc4f8",
  pageTypeSlug: "temper-skill",
  slug: "blood-magic",
  title: "Blood Magic",
  key: "blood-magic",
  baseName: "Blood Magic",
  description:
    '"When you cast a Dark Magic ability with a cost, you heal for 1600 Health if you are not at full Health. This portion of the ability scales off your Max Health.\\n\\nIf your Health is full, the higher of your Max Magicka or Stamina is increased by 10% for 10 seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_026.dds",
  esoSkillId: 45172,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "sorcerer-dark-magic",
  skillType: "passive",
  subcategoryId: "sorcerer-dark-magic",
  status: "unsupported",
} as const satisfies TemperSkill
