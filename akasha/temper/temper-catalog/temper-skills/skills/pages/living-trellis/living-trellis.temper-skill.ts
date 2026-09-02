import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const livingTrellis = {
  id: "01a05fd1-2dea-7075-b86b-f556e177e18b",
  pageTypeSlug: "temper-skill",
  slug: "living-trellis",
  title: "Living Trellis",
  key: "living-trellis",
  baseName: "Living Vines",
  description:
    '"Grow vines to embrace you or the lowest health ally in front of you for 10 seconds. The vines heal the target for 718 Health each time they take damage. This effect can occur once every 1 second.\\n\\nWhen the vines expire, they heal the target for an additional 1742 Health."',
  icon: "/esoui/art/icons/ability_warden_010_b.dds",
  esoSkillId: 93883,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
