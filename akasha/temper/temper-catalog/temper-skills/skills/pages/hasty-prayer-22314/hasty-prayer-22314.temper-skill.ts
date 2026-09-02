import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hastyPrayer22314 = {
  id: "01a05fd0-dca8-7e37-b8f8-259567daf8f7",
  pageTypeSlug: "temper-skill",
  slug: "hasty-prayer-22314",
  title: "Hasty Prayer",
  key: "hasty-prayer-22314",
  baseName: "Healing Ritual",
  description:
    '"Focus your spiritual devotion, healing you and nearby allies for |cffffff8219|r Health.\\n\\nAffected targets gain Minor Expedition, increasing their Movement Speed by |cffffff15|r% for |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_templar_lingering_ritual.dds",
  esoSkillId: 22314,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
