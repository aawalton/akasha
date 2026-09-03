import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hastyPrayer = {
  id: "019e6245-a69c-7cda-b99d-d640836c3f8a",
  pageTypeSlug: "temper-skill",
  slug: "hasty-prayer",
  title: "Hasty Prayer",
  key: "hasty-prayer",
  baseName: "Healing Ritual",
  description:
    '"Focus your spiritual devotion, healing you and nearby allies for 2614 Health.\\n\\nAffected targets gain Minor Expedition, increasing their Movement Speed by 15% for 10 seconds."',
  icon: "/esoui/art/icons/ability_templar_lingering_ritual.dds",
  esoSkillId: 27376,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
