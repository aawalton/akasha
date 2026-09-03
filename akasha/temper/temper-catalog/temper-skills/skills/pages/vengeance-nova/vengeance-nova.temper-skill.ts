import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceNova = {
  id: "019e6f53-a945-7e2a-83c2-9c1f5b4b7117",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-nova",
  title: "Vengeance Nova",
  key: "vengeance-nova",
  baseName: "Vengeance Nova",
  description:
    '"Call down a fragment of the sun, dealing |cffffff22049|r Magic Damage to up to 3 enemies in the area and stunning them for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_templar_nova.dds",
  esoSkillId: 237942,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-dawns-wrath",
  skillType: "ultimate",
  subcategoryId: "vengeance-templar-dawns-wrath",
} as const satisfies TemperSkill
