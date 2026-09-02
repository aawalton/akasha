import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const sanctumOfTheAbyssalSea = {
  id: "01a05fd1-7cad-74fe-ad99-59ca4a84a499",
  pageTypeSlug: "temper-skill",
  slug: "sanctum-of-the-abyssal-sea",
  title: "Sanctum of the Abyssal Sea",
  key: "sanctum-of-the-abyssal-sea",
  baseName: "Gibbering Shield",
  description:
    '"Gather the true strength of Apocrypha as protective tentacles rise from the Abyssal Sea around you. The tentacles form a damage shield that absorbs 60% of all damage for 10 seconds, up to a max of 37697 damage, scaling off your Max Health.\\n\\nWhen the shield collapses you lash out, dealing all of the damage absorbed as Magic Damage to enemies within 5 meters over 10 seconds."',
  icon: "/esoui/art/icons/ability_arcanist_012_a.dds",
  esoSkillId: 40192372,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "ultimate",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
