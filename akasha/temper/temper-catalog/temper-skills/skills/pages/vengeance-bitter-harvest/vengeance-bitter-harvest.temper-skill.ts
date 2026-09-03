import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceBitterHarvest = {
  id: "019e6f53-a8bf-748b-92a8-fbb94b978cd1",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-bitter-harvest",
  title: "Vengeance Bitter Harvest",
  key: "vengeance-bitter-harvest",
  baseName: "Vengeance Bitter Harvest",
  description:
    '"Sap the lingering life from up to 3 fresh corpses, granting you |cffffff3|r Ultimate and healing |cffffff1508|r Health per corpse consumed. You also gain Major Protection for |cffffff10|r seconds, reducing your damage taken by |cffffff10|r%. \\n\\nThis ability can be activated once every |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_necromancer_011.dds",
  esoSkillId: 238141,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "vengeance-necromancer-bone-tyrant",
} as const satisfies TemperSkill
