import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mendWounds = {
  id: "019e6f53-a471-737a-a83b-82667198ba8c",
  pageTypeSlug: "temper-skill",
  slug: "mend-wounds",
  title: "Mend Wounds",
  key: "mend-wounds",
  baseName: "Mend Wounds",
  description:
    '"Invoke the Rites of Moawita, replacing your Light and Heavy Attacks with healing abilities that can only be used on allies.\\n\\nYour Light Attacks heal for |cffffff2958|r.\\n\\nYour Heavy Attacks heal for |cffffff2629|r every |cffffff1|r second, and restore |cffffff1155|r Magicka to you for successfully healing."',
  icon: "/esoui/art/icons/ability_psijic_006.dds",
  esoSkillId: 103543,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
