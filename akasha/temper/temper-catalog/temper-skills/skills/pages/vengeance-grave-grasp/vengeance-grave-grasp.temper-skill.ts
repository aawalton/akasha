import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceGraveGrasp = {
  id: "019e6f53-a91d-78d8-ba5e-3772c77deef5",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-grave-grasp",
  title: "Vengeance Grave Grasp",
  key: "vengeance-grave-grasp",
  baseName: "Vengeance Grave Grasp",
  description:
    '"Summon three patches of skeletal claws from the ground in front of you to grab up to 3 enemies, immobilizing them for |cffffff3|r seconds and applying Minor Maim for |cffffff10|r seconds, reducing their damage done by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_necromancer_009.dds",
  esoSkillId: 253156,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "vengeance-necromancer-bone-tyrant",
} as const satisfies TemperSkill
