import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const healingThicket = {
  id: "019e6245-a69e-7dd0-9f37-40faa6da6b2b",
  pageTypeSlug: "temper-skill",
  slug: "healing-thicket",
  title: "Healing Thicket",
  key: "healing-thicket",
  baseName: "Secluded Grove",
  description:
    '"Swell a healing forest at the target location, instantly healing the most injured friendly target for 2880 Health. The forest continues to heal you and your allies in the area for 958 every 1 second for 6 seconds.\\n\\nThe healing over time will continue to heal you or your allies for 4 seconds after leaving the forest."',
  icon: "/esoui/art/icons/ability_warden_012_b.dds",
  esoSkillId: 93974,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-green-balance",
  skillType: "ultimate",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
