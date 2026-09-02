import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const essenceDrain = {
  id: "01a05fd0-8e25-78e5-95bb-53473aea0660",
  pageTypeSlug: "temper-skill",
  slug: "essence-drain",
  title: "Essence Drain",
  key: "essence-drain",
  baseName: "Essence Drain",
  description:
    '"You gain Major Mending for 4 seconds after completing a fully-charged Heavy Attack, increasing your healing done by 16%.\\n\\nYou also heal yourself or an ally within 12 meters of the target for 50% of the damage inflicted by the final hit of a fully-charged Heavy Attack."',
  icon: "/esoui/art/icons/ability_templar_013.dds",
  esoSkillId: 45517,
  isMorph: false,
  learnedLevel: 34,
  lineRankNeeded: 34,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-restoration-staff",
  skillType: "passive",
  subcategoryId: "weapon-restoration-staff",
  status: "unsupported",
} as const satisfies TemperSkill
