import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ritualOfRetribution = {
  id: "019e6245-a715-7407-a98c-a25124443ff3",
  pageTypeSlug: "temper-skill",
  slug: "ritual-of-retribution",
  title: "Ritual of Retribution",
  key: "ritual-of-retribution",
  baseName: "Cleansing Ritual",
  description:
    '"Exalt in the sacred light of the Aedra, cleansing up to 2 harmful effects from yourself immediately.  While in the area, enemies take 435 Magic Damage every 2 seconds for 20 seconds which increases by 12% per tick.  \\n\\nAllies in the area can activate the Purify synergy, cleansing all harmful effects from themselves and healing for 1912 Health."',
  icon: "/esoui/art/icons/ability_templar_purifying_ritual.dds",
  esoSkillId: 27275,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
