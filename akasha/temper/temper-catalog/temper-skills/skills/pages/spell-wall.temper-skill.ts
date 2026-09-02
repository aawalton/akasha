import type { TemperSkill } from "../temper-skill.page-type.ts"

export const spellWall = {
  id: "01a05fd1-d23c-7e9a-887c-1505fe0fe8a7",
  pageTypeSlug: "temper-skill",
  slug: "spell-wall",
  title: "Spell Wall",
  key: "spell-wall",
  baseName: "Shield Wall",
  description:
    '"Reinforce your shield, allowing you to automatically block all attacks at no cost and reflect all projectiles cast at you for 7 seconds."',
  icon: "/esoui/art/icons/ability_1handed_006_a.dds",
  esoSkillId: 86333,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "ultimate",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
