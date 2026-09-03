import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const subterraneanAssault86019 = {
  id: "019e6f53-a7d7-764f-a5f5-b693fc38f3b5",
  pageTypeSlug: "temper-skill",
  slug: "subterranean-assault-86019",
  title: "Subterranean Assault",
  key: "subterranean-assault-86019",
  baseName: "Scorch",
  description:
    '"Stir a group of shalk that attack after |cffffff3|r seconds, dealing |cffffff9521|r Poison Damage to enemies in front of you.\\n\\nAfter the shalk complete their attack, they burrow underground for |cffffff3|r seconds and then resurface again, dealing |cffffff9521|r Poison Damage to enemies in front of you."',
  icon: "/esoui/art/icons/ability_warden_015_b.dds",
  esoSkillId: 86019,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
