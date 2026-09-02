import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const healingThicket85807 = {
  id: "01a05fd0-dcab-7a1c-8d59-7fde07e45fc1",
  pageTypeSlug: "temper-skill",
  slug: "healing-thicket-85807",
  title: "Healing Thicket",
  key: "healing-thicket-85807",
  baseName: "Secluded Grove",
  description:
    '"Swell a healing forest at the target location, instantly healing the most injured friendly target for |cffffff9057|r Health. The forest continues to heal you and your allies in the area for |cffffff3017|r every |cffffff1|r second for |cffffff6|r seconds.\\n\\nThe healing over time will continue to heal you or your allies for |cffffff4|r seconds after leaving the forest."',
  icon: "/esoui/art/icons/ability_warden_012_b.dds",
  esoSkillId: 85807,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-green-balance",
  skillType: "ultimate",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
