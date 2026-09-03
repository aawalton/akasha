import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const powerOverload = {
  id: "019e6245-a6ea-7800-90d4-06944da1fed9",
  pageTypeSlug: "temper-skill",
  slug: "power-overload",
  title: "Power Overload",
  key: "power-overload",
  baseName: "Overload",
  description:
    '"Charge your fists with the power of the storm, replacing your Light and Heavy Attacks with new, stronger abilities.\\n\\nLight Attacks become lightning bolts, dealing 2640 Shock Damage to an enemy up to 32 meters away.\\n\\nHeavy Attacks blast enemies in a 6 x 8 area for 2375 Shock Damage.\\n\\nAttacks deplete Ultimate until you run out, or the ability is toggled off."',
  icon: "/esoui/art/icons/ability_sorcerer_power_overload.dds",
  esoSkillId: 30366,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-storm-calling",
  skillType: "ultimate",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
