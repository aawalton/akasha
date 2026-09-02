import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const spellWall83292 = {
  id: "01a05fd1-d23d-72e7-b7d5-32a4adabc006",
  pageTypeSlug: "temper-skill",
  slug: "spell-wall-83292",
  title: "Spell Wall",
  key: "spell-wall-83292",
  baseName: "Shield Wall",
  description:
    '"Reinforce your shield, allowing you to automatically block all attacks at no cost and reflect all projectiles cast at you for |cffffff7|r seconds."',
  icon: "/esoui/art/icons/ability_1handed_006_a.dds",
  esoSkillId: 83292,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 50,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "ultimate",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
