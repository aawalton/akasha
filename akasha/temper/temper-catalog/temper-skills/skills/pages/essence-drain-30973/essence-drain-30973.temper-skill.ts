import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const essenceDrain30973 = {
  id: "019e6f53-a1a0-7713-b02c-0e139025af58",
  pageTypeSlug: "temper-skill",
  slug: "essence-drain-30973",
  title: "Essence Drain",
  key: "essence-drain-30973",
  baseName: "Essence Drain",
  description:
    '"You gain Major Mending for |cffffff2|r seconds after completing a fully-charged Heavy Attack, increasing your healing done by |cffffff16|r%.\\n\\nYou also heal yourself or an ally within |cffffff12|r meters of the target for |cffffff26|r% of the damage inflicted by the final hit of a fully-charged Heavy Attack."',
  icon: "/esoui/art/icons/ability_templar_013.dds",
  esoSkillId: 30973,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "weapon-restoration-staff",
  skillType: "passive",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
