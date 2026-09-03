import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const resistantFlesh117883 = {
  id: "019e6f53-a618-7782-8d3b-ac0e37dd962b",
  pageTypeSlug: "temper-skill",
  slug: "resistant-flesh-117883",
  title: "Resistant Flesh",
  key: "resistant-flesh-117883",
  baseName: "Render Flesh",
  description:
    '"Sacrifice your own power to repair damaged flesh, healing you or an ally in front of you for |cffffff11321|r Health but applying Minor Defile to yourself for |cffffff4|r seconds, reducing your healing received and damage shield strength by |cffffff6|r%.\\n\\nYou grant the target Spell and Physical Resistance equal to half the amount healed for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_necromancer_013_a.dds",
  esoSkillId: 117883,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
