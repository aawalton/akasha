import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceHealingRitual = {
  id: "019e6f53-a921-7c30-950a-6995dc01c641",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-healing-ritual",
  title: "Vengeance Healing Ritual",
  key: "vengeance-healing-ritual",
  baseName: "Vengeance Healing Ritual",
  description:
    '"Focus your spiritual devotion, healing you or up to 3 nearby allies for |cffffff12049|r Health."',
  icon: "/esoui/art/icons/ability_templar_healing_ritual.dds",
  esoSkillId: 238018,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-restoring-light",
  skillType: "active",
  subcategoryId: "vengeance-templar-restoring-light",
} as const satisfies TemperSkill
