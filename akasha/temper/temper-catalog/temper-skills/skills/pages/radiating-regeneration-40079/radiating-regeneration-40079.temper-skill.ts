import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const radiatingRegeneration40079 = {
  id: "019e6f53-a594-7095-8189-a3b326b3b8f9",
  pageTypeSlug: "temper-skill",
  slug: "radiating-regeneration-40079",
  title: "Radiating Regeneration",
  key: "radiating-regeneration-40079",
  baseName: "Regeneration",
  description:
    '"Share your staff\'s life-giving energy, healing you or up to |cffffff3|r nearby allies for |cffffff11316|r over |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_002a.dds",
  esoSkillId: 40079,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
