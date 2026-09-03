import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceRenderFlesh = {
  id: "019e6f53-a963-7ea8-9173-8a1cce2f2781",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-render-flesh",
  title: "Vengeance Render Flesh",
  key: "vengeance-render-flesh",
  baseName: "Vengeance Render Flesh",
  description:
    '"Sacrifice your own power to repair damaged flesh, healing you or an ally in front of you for |cffffff16065|r Health but applying Minor Defile to yourself for |cffffff4|r seconds, reducing your healing received and damage shield strength by |cffffff6|r%."',
  icon: "/esoui/art/icons/ability_necromancer_013.dds",
  esoSkillId: 238251,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-living-death",
  skillType: "active",
  subcategoryId: "vengeance-necromancer-living-death",
} as const satisfies TemperSkill
