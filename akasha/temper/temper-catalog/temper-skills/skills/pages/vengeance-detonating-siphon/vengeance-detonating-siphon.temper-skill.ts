import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceDetonatingSiphon = {
  id: "019e6f53-a8ee-7ad4-99b2-557429af0f69",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-detonating-siphon",
  title: "Vengeance Detonating Siphon",
  key: "vengeance-detonating-siphon",
  baseName: "Vengeance Detonating Siphon",
  description:
    '"Violently drain the last spark of life from a corpse, dealing |cffffff10143|r Disease Damage to up to 3 enemies around the corpse after |cffffff1|r second. Deals up to |cffffff100|r% more damage to enemies under |cffffff50|r% Health."',
  icon: "/esoui/art/icons/ability_necromancer_005_b.dds",
  esoSkillId: 238126,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "vengeance-necromancer-grave-lord",
} as const satisfies TemperSkill
