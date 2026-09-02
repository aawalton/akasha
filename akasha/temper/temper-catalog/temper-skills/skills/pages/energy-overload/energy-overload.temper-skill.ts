import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const energyOverload = {
  id: "01a05fd0-8e21-75eb-b7a6-0cbe5ba7b956",
  pageTypeSlug: "temper-skill",
  slug: "energy-overload",
  title: "Energy Overload",
  key: "energy-overload",
  baseName: "Overload",
  description:
    '"Charge your fists with the power of the storm, replacing your Light and Heavy Attacks with new, stronger abilities.\\n\\nLight Attacks become lightning bolts, dealing 2399 Shock Damage to an enemy up to 28 meters away.\\n\\nHeavy Attacks blast enemies in a 4 x 6 area for 2160 Shock Damage.\\n\\nThe attacks restore 1200 Magicka and Stamina, and deplete Ultimate until you run out, or the ability is toggled off."',
  icon: "/esoui/art/icons/ability_sorcerer_energy_overload.dds",
  esoSkillId: 30381,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-storm-calling",
  skillType: "ultimate",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
