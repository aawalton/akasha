import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceGrimFocus = {
  id: "019e6f53-a91e-7f5d-8081-687138717d61",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-grim-focus",
  title: "Vengeance Grim Focus",
  key: "vengeance-grim-focus",
  baseName: "Vengeance Grim Focus",
  description:
    '"Focus your lethal intent into a spectral bow to fire at an enemy, dealing |cffffff20034|r Magic Damage, up to once every |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_005.dds",
  esoSkillId: 237605,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-assassination",
  skillType: "active",
  subcategoryId: "vengeance-nightblade-assassination",
} as const satisfies TemperSkill
