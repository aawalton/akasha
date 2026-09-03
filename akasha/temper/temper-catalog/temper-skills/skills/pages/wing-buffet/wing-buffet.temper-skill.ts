import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const wingBuffet = {
  id: "019e6f53-a9f5-73b7-bdb5-6a50966e6f14",
  pageTypeSlug: "temper-skill",
  slug: "wing-buffet",
  title: "Wing Buffet",
  key: "wing-buffet",
  baseName: "Wing Buffet",
  description:
    '"Unfurl draconic wings to knock back enemies around you |cffffff4|r meters and stun them for |cffffff1.8|r seconds.\\n\\nThe winds from your buffet swirl around you, reducing your damage taken from projectiles by |cffffff50|r% for |cffffff6|r seconds, while granting you Major Expedition for |cffffff4|r seconds, increasing Movement Speed by |cffffff30|r%."',
  icon: "/esoui/art/icons/ability_dragonknight_008.dds",
  esoSkillId: 21007,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
