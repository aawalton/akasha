import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceAnnulment = {
  id: "019e6f53-a8ae-76ef-b58a-88cbbd0565b1",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-annulment",
  title: "Vengeance Annulment",
  key: "vengeance-annulment",
  baseName: "Vengeance Annulment",
  description:
    '"Convert a portion of your Magicka into a protective ward, gaining a damage shield that absorbs |cffffff4885|r damage for |cffffff6|r seconds. Damage shield strength capped at |cffffff60|r% of your Max Health."',
  icon: "/esoui/art/icons/ability_armor_003.dds",
  esoSkillId: 247561,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-armor",
  skillType: "active",
  subcategoryId: "vengeance-armor",
} as const satisfies TemperSkill
