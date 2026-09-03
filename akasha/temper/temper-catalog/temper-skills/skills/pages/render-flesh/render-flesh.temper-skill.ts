import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const renderFlesh = {
  id: "019e6f53-a5f4-7d93-8cec-8c09f9a1c257",
  pageTypeSlug: "temper-skill",
  slug: "render-flesh",
  title: "Render Flesh",
  key: "render-flesh",
  baseName: "Render Flesh",
  description:
    '"Sacrifice your own power to repair damaged flesh, healing you or an ally in front of you for |cffffff10960|r Health but applying Minor Defile to yourself for |cffffff4|r seconds, reducing your healing received and damage shield strength by |cffffff6|r%."',
  icon: "/esoui/art/icons/ability_necromancer_013.dds",
  esoSkillId: 114196,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
