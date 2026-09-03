import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const breathOfLife22256 = {
  id: "019e6f53-9f8e-7fb6-b18d-dfda66934817",
  pageTypeSlug: "temper-skill",
  slug: "breath-of-life-22256",
  title: "Breath of Life",
  key: "breath-of-life-22256",
  baseName: "Rushed Ceremony",
  description:
    '"Beacon your inner light, healing yourself or a wounded ally in front of you for |cffffff10960|r Health.\\n\\nAlso heals one other injured target for |cffffff3773|r Health."',
  icon: "/esoui/art/icons/ability_templar_breath_of_life.dds",
  esoSkillId: 22256,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
