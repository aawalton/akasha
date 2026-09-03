import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const radiatingRegeneration = {
  id: "019e6226-0107-756d-ad7c-60b34ff02ea8",
  pageTypeSlug: "temper-skill",
  slug: "radiating-regeneration",
  title: "Radiating Regeneration",
  key: "radiating-regeneration",
  baseName: "Regeneration",
  description:
    '"Share your staff\'s life-giving energy, healing you or up to 3 nearby allies for 3594 over 10 seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_002a.dds",
  esoSkillId: 41288,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
