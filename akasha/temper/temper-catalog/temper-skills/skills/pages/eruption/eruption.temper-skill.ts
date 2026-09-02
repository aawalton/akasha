import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const eruption = {
  id: "01a05fd0-8e24-763c-9f67-3c76613827b4",
  pageTypeSlug: "temper-skill",
  slug: "eruption",
  title: "Eruption",
  key: "eruption",
  baseName: "Ash Cloud",
  description:
    '"Summon a scorching cloud of ash at the target location for 15 seconds, dealing 1799 Flame Damage immediately, reducing enemy Movement Speed by 70%, and dealing 319 Flame Damage in the area every 1 second.\\n\\nThe eruptive damage can occur once every 10 seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_016b.dds",
  esoSkillId: 0,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "active",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
