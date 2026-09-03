import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const rapidRegeneration = {
  id: "019e6226-010a-7b8e-9236-42d4c2df11ad",
  pageTypeSlug: "temper-skill",
  slug: "rapid-regeneration",
  title: "Rapid Regeneration",
  key: "rapid-regeneration",
  baseName: "Regeneration",
  description:
    '"Share your staff\'s life-giving energy, healing you or a nearby ally for 3594 Health over 5 seconds.\\n\\nThe healing increases by up to 50% more on targets under 100% Health."',
  icon: "/esoui/art/icons/ability_restorationstaff_002b.dds",
  esoSkillId: 41276,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
