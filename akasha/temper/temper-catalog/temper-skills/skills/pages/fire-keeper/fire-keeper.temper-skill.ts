import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const fireKeeper = {
  id: "019e6f53-a1fe-7596-a22b-9d3584332146",
  pageTypeSlug: "temper-skill",
  slug: "fire-keeper",
  title: "Fire Keeper",
  key: "fire-keeper",
  baseName: "Hearthfire",
  description:
    '"Throw out a purifying flame, filling a large area with warmth for |cffffff15|r seconds. This fire heals you and your allies at the target location for |cffffff1414|r Health every |cffffff1|r second. This healing increases by |cffffff50|r% if you are in the area.\\n\\nHealed targets gain Minor Fortitude and Minor Heroism for |cffffff15|r seconds, increasing Health Recovery by |cffffff15|r% and generating |cffffff1|r Ultimate every |cffffff1.5|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_016a.dds",
  esoSkillId: 20779,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill
