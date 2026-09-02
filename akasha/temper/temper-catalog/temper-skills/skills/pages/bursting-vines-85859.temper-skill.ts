import type { TemperSkill } from "../temper-skill.page-type.ts"

export const burstingVines85859 = {
  id: "01a05fd0-4384-7857-8f15-2ab3b56d62ff",
  pageTypeSlug: "temper-skill",
  slug: "bursting-vines-85859",
  title: "Bursting Vines",
  key: "bursting-vines-85859",
  baseName: "Nature's Grasp",
  description:
    '"Launch a vine to swing yourself to an ally, instantly healing them for |cffffff8489|r Health.  \\n\\nGain |cffffff10|r Ultimate when healing an ally under |cFFFFFF60%|r Health while you are in combat. This effect can occur every |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_warden_011_a.dds",
  esoSkillId: 85859,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
