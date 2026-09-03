import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const powerOfTheLight21763 = {
  id: "019e6f53-a527-7c27-aff0-2647b2d7ec6e",
  pageTypeSlug: "temper-skill",
  slug: "power-of-the-light-21763",
  title: "Power of the Light",
  key: "power-of-the-light-21763",
  baseName: "Backlash",
  description:
    '"Summon an expanding beam of pure sunlight to doom an enemy, dealing |cffffff4038|r Physical Damage immediately and marking them for |cffffff6|r seconds.\\n\\nAfter the duration ends, the sunlight bursts, dealing |cffffff4469|r Physical Damage to the enemy, which increases based on the amount of damage you dealt to them over the duration, up to |cffffff200|r%.\\n\\nYou can have only one Power of the Light active at a time, and each hit of the ability applies the Sundered status effect."',
  icon: "/esoui/art/icons/ability_templar_power_of_the_light.dds",
  esoSkillId: 21763,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
