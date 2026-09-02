import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const energyOverload24804 = {
  id: "01a05fd0-8e22-724c-838c-1dd0f1e13901",
  pageTypeSlug: "temper-skill",
  slug: "energy-overload-24804",
  title: "Energy Overload",
  key: "energy-overload-24804",
  baseName: "Overload",
  description:
    '"Charge your fists with the power of the storm, replacing your Light and Heavy Attacks with new, stronger abilities.\\n\\nLight Attacks become lightning bolts, dealing |cffffff8342|r Shock Damage to an enemy up to |cffffff28|r meters away.\\n\\nHeavy Attacks blast enemies in a |cffffff4 x 6|r area for |cffffff7934|r Shock Damage.\\n\\nThe attacks restore |cffffff1200|r Magicka and Stamina, and deplete Ultimate until you run out, or the ability is toggled off."',
  icon: "/esoui/art/icons/ability_sorcerer_energy_overload.dds",
  esoSkillId: 24804,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-storm-calling",
  skillType: "ultimate",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
