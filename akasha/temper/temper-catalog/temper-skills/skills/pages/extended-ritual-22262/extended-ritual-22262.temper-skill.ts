import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const extendedRitual22262 = {
  id: "019e6f53-a1d7-7cad-86de-fa56752c7ada",
  pageTypeSlug: "temper-skill",
  slug: "extended-ritual-22262",
  title: "Extended Ritual",
  key: "extended-ritual-22262",
  baseName: "Cleansing Ritual",
  description:
    '"Exalt in the sacred light of the Aedra, cleansing up to |cffffff5|r harmful effects from yourself immediately and healing you and nearby allies for |cffffff2657|r Health every |cffffff2|r seconds for |cffffff30|r seconds.\\n\\nAllies in the area can activate the Purify synergy, cleansing all harmful effects from themselves and healing for |cffffff6012|r Health."',
  icon: "/esoui/art/icons/ability_templar_extended_ritual.dds",
  esoSkillId: 22262,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
