import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const extendedRitual = {
  id: "019e6245-a67f-71b5-8ae3-b84d20c1aba2",
  pageTypeSlug: "temper-skill",
  slug: "extended-ritual",
  title: "Extended Ritual",
  key: "extended-ritual",
  baseName: "Cleansing Ritual",
  description:
    '"Exalt in the sacred light of the Aedra, cleansing up to 5 harmful effects from yourself immediately and healing you and nearby allies for 844 Health every 2 seconds for 30 seconds.\\n\\nAllies in the area can activate the Purify synergy, cleansing all harmful effects from themselves and healing for 1912 Health."',
  icon: "/esoui/art/icons/ability_templar_extended_ritual.dds",
  esoSkillId: 27295,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
