import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const blazingSpear26869 = {
  id: "019e6f53-9f2b-7acb-b13f-a306bc3f3d1d",
  pageTypeSlug: "temper-skill",
  slug: "blazing-spear-26869",
  title: "Blazing Spear",
  key: "blazing-spear-26869",
  baseName: "Spear Shards",
  description:
    '"Send your spear into the heavens to bring down a shower of divine wrath, dealing |cffffff6401|r Magic Damage to enemies in the area and an additional |cffffff965|r Magic Damage every |cffffff1|r second for |cffffff10|r seconds. Enemies hit by the initial hit are immobilized for |cffffff4|r seconds.\\n\\nAn ally near the spear can activate the Blessed Shards synergy, restoring |cffffff3960|r Magicka or Stamina, whichever maximum is higher."',
  icon: "/esoui/art/icons/ability_templarsun_thrust.dds",
  esoSkillId: 26869,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
