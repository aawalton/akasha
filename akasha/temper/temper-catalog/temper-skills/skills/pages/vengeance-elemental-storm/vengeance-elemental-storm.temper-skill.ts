import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceElementalStorm = {
  id: "019e6f53-a8fb-76a6-96cb-12a76635faac",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-elemental-storm",
  title: "Vengeance Elemental Storm",
  key: "vengeance-elemental-storm",
  baseName: "Vengeance Elemental Storm",
  description:
    '"Create a cataclysmic storm at the target location that builds for |cffffff2|r seconds then lays waste to up to 3 enemies in the area, dealing |cffffff23520|r Magic Damage."',
  icon: "/esoui/art/icons/ability_destructionstaff_012.dds",
  esoSkillId: 241485,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-destruction-staff",
  skillType: "ultimate",
  subcategoryId: "vengeance-weapon-destruction-staff",
} as const satisfies TemperSkill
