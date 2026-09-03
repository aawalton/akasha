import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const breathOfLife = {
  id: "019e6245-a606-7e0b-9275-9d52f1a6bb1d",
  pageTypeSlug: "temper-skill",
  slug: "breath-of-life",
  title: "Breath of Life",
  key: "breath-of-life",
  baseName: "Rushed Ceremony",
  description:
    '"Beacon your inner light, healing yourself or a wounded ally in front of you for 3485 Health.\\n\\nAlso heals one other injured target for 1199 Health."',
  icon: "/esoui/art/icons/ability_templar_breath_of_life.dds",
  esoSkillId: 24222,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
