import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeancePetrify = {
  id: "01a05fd2-1e7c-7c87-a7d6-9ba4f6d17ec0",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-petrify",
  title: "Vengeance Petrify",
  key: "vengeance-petrify",
  baseName: "Vengeance Petrify",
  description:
    '"Encase an enemy in molten rock after |cffffff1|r second, stunning them for |cffffff3|r seconds.\\n\\nThis stun cannot be blocked."',
  icon: "/esoui/art/icons/ability_dragonknight_014.dds",
  esoSkillId: 237787,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "vengeance-dragonknight-earthen-heart",
} as const satisfies TemperSkill
