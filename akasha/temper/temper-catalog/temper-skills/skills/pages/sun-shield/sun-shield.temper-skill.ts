import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const sunShield = {
  id: "019e6f53-a7f4-7603-9ff0-0edf7b26cca9",
  pageTypeSlug: "temper-skill",
  slug: "sun-shield",
  title: "Sun Shield",
  key: "sun-shield",
  baseName: "Sun Shield",
  description:
    '"Surround yourself with solar rays, dealing |cffffff6400|r Magic Damage to nearby enemies and applying Minor Maim to them for |cffffff10|r seconds, reducing their damage done by |cffffff5|r%.\\n\\nThe rays then protect you, granting a damage shield that absorbs up to |cffffff6802|r damage for |cffffff6|r seconds, increasing by |cffffff10|r% for each enemy hit, up to |cffffff60|r%. This portion of the ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_templar_sun_shield.dds",
  esoSkillId: 22178,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
