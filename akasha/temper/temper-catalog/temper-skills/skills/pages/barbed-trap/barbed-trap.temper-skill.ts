import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const barbedTrap = {
  id: "019e6238-c298-7e64-9b8d-0a92ab254a70",
  pageTypeSlug: "temper-skill",
  slug: "barbed-trap",
  title: "Barbed Trap",
  key: "barbed-trap",
  baseName: "Trap Beast",
  description:
    '"Set a sharpened blade trap at your location, which takes 1.5 seconds to arm and lasts for 20 seconds.\\n\\nWhen triggered, the trap deals 1438 Bleed Damage, an additional 3580 Bleed Damage over 20 seconds, and grants you Minor Force, increasing your Critical Damage by 10% for the duration.\\n\\nEnemies hit by the initial hit are afflicted with the Hemorrhaging status effect.\\n\\n Enemies who activate the trap are immobilized for 2 seconds."',
  icon: "/esoui/art/icons/ability_fightersguild_004_a.dds",
  esoSkillId: 42747,
  isMorph: true,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
