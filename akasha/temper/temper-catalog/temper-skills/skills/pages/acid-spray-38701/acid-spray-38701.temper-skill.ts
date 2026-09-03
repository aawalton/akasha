import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const acidSpray38701 = {
  id: "019e6f53-9e92-706a-b3e8-b896c820a496",
  pageTypeSlug: "temper-skill",
  slug: "acid-spray-38701",
  title: "Acid Spray",
  key: "acid-spray-38701",
  baseName: "Arrow Spray",
  description:
    '"Fire a burst of arrows in one shot, dealing |cffffff6401|r Poison Damage to enemies in front of you, and dealing an additional |cffffff5375|r Poison Damage over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_bow_005_b.dds",
  esoSkillId: 38701,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
