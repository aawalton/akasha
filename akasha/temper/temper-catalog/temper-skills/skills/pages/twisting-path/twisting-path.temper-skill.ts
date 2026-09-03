import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const twistingPath = {
  id: "019e6245-a756-7bb3-9f8d-8cb0d85290b4",
  pageTypeSlug: "temper-skill",
  slug: "twisting-path",
  title: "Twisting Path",
  key: "twisting-path",
  baseName: "Path of Darkness",
  description:
    '"Create a corridor of shadows for 10 seconds, granting you and allies in the area Major Expedition, increasing Movement Speed by 30% which persists for 4 seconds after leaving the path.\\n\\nDeals 377 Magic Damage to enemies in the target area every 1 second."',
  icon: "/esoui/art/icons/ability_nightblade_010_b.dds",
  esoSkillId: 37796,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
