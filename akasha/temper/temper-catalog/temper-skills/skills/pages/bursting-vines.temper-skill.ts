import type { TemperSkill } from "../temper-skill.page-type.ts"

export const burstingVines = {
  id: "01a05fd0-4384-7d5f-94c1-ef8d09ad2f67",
  pageTypeSlug: "temper-skill",
  slug: "bursting-vines",
  title: "Bursting Vines",
  key: "bursting-vines",
  baseName: "Nature's Grasp",
  description:
    '"Launch a vine to swing yourself to an ally, instantly healing them for 2700 Health.  \\n\\nGain 10 Ultimate when healing an ally under 60% Health while you are in combat. This effect can occur every 4 seconds."',
  icon: "/esoui/art/icons/ability_warden_011_a.dds",
  esoSkillId: 93937,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
