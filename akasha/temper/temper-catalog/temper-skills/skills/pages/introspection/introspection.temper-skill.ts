import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const introspection = {
  id: "019e6238-c2d0-7052-b8d0-4b79ff7bc98d",
  pageTypeSlug: "temper-skill",
  slug: "introspection",
  title: "Introspection",
  key: "introspection",
  baseName: "Meditate",
  description:
    '"Focus your body and mind into a meditative state, healing for 1800 Health and restoring 1500 Magicka and Stamina every 1 second.\\n\\nMaintaining the channel increases the Health restored by 10% every tick, up to a maximum of 50%.\\n\\nYou will remain in a meditative state until you toggle this ability off or are interrupted."',
  icon: "/esoui/art/icons/ability_psijic_004_b.dds",
  esoSkillId: 40103665,
  isMorph: true,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
