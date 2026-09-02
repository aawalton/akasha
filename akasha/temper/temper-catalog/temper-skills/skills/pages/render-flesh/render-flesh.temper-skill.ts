import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const renderFlesh = {
  id: "01a05fd1-7c87-7b69-b5f9-8913e98e46f4",
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
