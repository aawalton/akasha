import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const energyOrb = {
  id: "019e6238-c2b8-730a-bd80-67b03c978f7a",
  pageTypeSlug: "temper-skill",
  slug: "energy-orb",
  title: "Energy Orb",
  key: "energy-orb",
  baseName: "Necrotic Orb",
  description:
    '"Project a globe of regeneration that slowly floats forward, healing for 489 Health every 1 second to you and nearby allies.\\n\\nAn ally near the globe can activate the Healing Combustion synergy, causing the orb to explode and heal for 2249 Health to nearby allies and restoring 3960 Magicka or Stamina to the activator, whichever maximum is higher."',
  icon: "/esoui/art/icons/ability_undaunted_004b.dds",
  esoSkillId: 43447,
  isMorph: true,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
