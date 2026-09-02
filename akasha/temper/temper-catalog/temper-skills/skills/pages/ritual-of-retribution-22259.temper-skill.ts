import type { TemperSkill } from "../temper-skill.page-type.ts"

export const ritualOfRetribution22259 = {
  id: "01a05fd1-7c9d-729f-b8f8-d99f73e21628",
  pageTypeSlug: "temper-skill",
  slug: "ritual-of-retribution-22259",
  title: "Ritual of Retribution",
  key: "ritual-of-retribution-22259",
  baseName: "Cleansing Ritual",
  description:
    '"Exalt in the sacred light of the Aedra, cleansing up to |cffffff2|r harmful effects from yourself immediately.  While in the area, enemies take |cffffff1516|r Magic Damage every |cffffff2|r seconds for |cffffff20|r seconds which increases by |cffffff12|r% per tick.  \\n\\nAllies in the area can activate the Purify synergy, cleansing all harmful effects from themselves and healing for |cffffff6012|r Health."',
  icon: "/esoui/art/icons/ability_templar_purifying_ritual.dds",
  esoSkillId: 22259,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
