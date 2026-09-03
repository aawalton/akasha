import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const leechingVines = {
  id: "019e6245-a6ba-7c04-8972-2174b3bfd457",
  pageTypeSlug: "temper-skill",
  slug: "leeching-vines",
  title: "Leeching Vines",
  key: "leeching-vines",
  baseName: "Living Vines",
  description:
    '"Grow vines to embrace you or the lowest health ally in front of you for 10 seconds. The vines heal the target for 718 Health each time they take damage. This effect can occur once every 1 second.\\n\\nThe vines apply Minor Lifesteal to enemies that damage the target for 10 seconds, healing you and your allies for 600 Health every 1 second when damaging that enemy."',
  icon: "/esoui/art/icons/ability_warden_010_a.dds",
  esoSkillId: 93880,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
