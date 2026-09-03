import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ritualOfRebirth = {
  id: "019e6245-a714-7326-b2a2-fcee0331c4fd",
  pageTypeSlug: "temper-skill",
  slug: "ritual-of-rebirth",
  title: "Ritual of Rebirth",
  key: "ritual-of-rebirth",
  baseName: "Healing Ritual",
  description:
    '"Focus your spiritual devotion, healing you and nearby allies for 2614 Health.\\n\\nYou heal a single ally outside this ability\'s radius for an additional 2700 Health."',
  icon: "/esoui/art/icons/ability_templar_ritual_of_rebirth.dds",
  esoSkillId: 27352,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
