import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceRegeneration = {
  id: "01a05fd2-1e80-7144-8206-e5b5c06e5fdc",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-regeneration",
  title: "Vengeance Regeneration",
  key: "vengeance-regeneration",
  baseName: "Vengeance Regeneration",
  description:
    '"Share your staff\'s life-giving energy, healing you or a nearby ally for |cffffff26024|r Health over |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_002.dds",
  esoSkillId: 241521,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "vengeance-weapon-restoration-staff",
} as const satisfies TemperSkill
