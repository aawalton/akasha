import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const introspection103665 = {
  id: "01a05fd0-dcca-79c8-907f-1f2937553d26",
  pageTypeSlug: "temper-skill",
  slug: "introspection-103665",
  title: "Introspection",
  key: "introspection-103665",
  baseName: "Meditate",
  description:
    '"Focus your body and mind into a meditative state, healing for |cffffff1836|r Health and restoring |cffffff1500|r Magicka and Stamina every |cffffff1|r second.\\n\\nMaintaining the channel increases the Health restored by |cffffff10|r% every tick, up to a maximum of |cffffff50|r%.\\n\\nYou will remain in a meditative state until you toggle this ability off or are interrupted."',
  icon: "/esoui/art/icons/ability_psijic_004_b.dds",
  esoSkillId: 103665,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 2,
  rank: 8,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
