import type { TemperSkill } from "../temper-skill.page-type.ts"

export const antiCavalryCaltrops = {
  id: "01a05fd0-434b-79ab-90cf-5a056ee7d380",
  pageTypeSlug: "temper-skill",
  slug: "anti-cavalry-caltrops",
  title: "Anti-Cavalry Caltrops",
  key: "anti-cavalry-caltrops",
  baseName: "Caltrops",
  description:
    '"Hurl a ball of caltrops that scatter over the target area, dealing 281 Physical Damage every 1 second to enemies inside, and reducing their Movement Speed by 50%.\\n\\nThe caltrops also drain the Mount Stamina of any enemy in the area."',
  icon: "/esoui/art/icons/ability_ava_001_a.dds",
  esoSkillId: 46420,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 8,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
