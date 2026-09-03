import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const steadfastWard = {
  id: "019e6f53-a7b7-7235-8ebb-159001753bcb",
  pageTypeSlug: "temper-skill",
  slug: "steadfast-ward",
  title: "Steadfast Ward",
  key: "steadfast-ward",
  baseName: "Steadfast Ward",
  description:
    "\"Call on your staff's strength to protect you or the lowest health ally around you with a damage shield that absorbs |cffffff8237|r damage for |cffffff6|r seconds.\\n\\nThe shield's strength is increased by up to |cffffff100|r%, depending on the severity of the target's wounds.\"",
  icon: "/esoui/art/icons/ability_restorationstaff_001.dds",
  esoSkillId: 37232,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
