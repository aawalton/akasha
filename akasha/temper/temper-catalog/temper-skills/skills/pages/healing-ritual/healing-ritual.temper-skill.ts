import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const healingRitual = {
  id: "01a05fd0-dcaa-7268-bf70-e76a2a3e28cf",
  pageTypeSlug: "temper-skill",
  slug: "healing-ritual",
  title: "Healing Ritual",
  key: "healing-ritual",
  baseName: "Healing Ritual",
  description:
    '"Focus your spiritual devotion, healing you and nearby allies for |cffffff8220|r Health."',
  icon: "/esoui/art/icons/ability_templar_healing_ritual.dds",
  esoSkillId: 22304,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
