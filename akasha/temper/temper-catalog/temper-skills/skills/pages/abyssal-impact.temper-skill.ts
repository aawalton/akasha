import type { TemperSkill } from "../temper-skill.page-type.ts"

export const abyssalImpact = {
  id: "01a05fd0-433d-7f85-b199-16748bedee35",
  pageTypeSlug: "temper-skill",
  slug: "abyssal-impact",
  title: "Abyssal Impact",
  key: "abyssal-impact",
  baseName: "Abyssal Impact",
  description:
    '"Infuse your arm with abyssal magic to form tentacles that lash out at your foes, dealing |cffffff7125|r Physical Damage. Enemies are immobilized for |cffffff3|r seconds and marked with Abyssal Ink for |cffffff20|r seconds.\\n\\nYou deal |cffffff5|r% increased damage to enemies drenched in Abyssal Ink."',
  icon: "/esoui/art/icons/ability_arcanist_003.dds",
  esoSkillId: 185817,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
