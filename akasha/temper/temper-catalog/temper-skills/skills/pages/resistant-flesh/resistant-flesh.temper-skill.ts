import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const resistantFlesh = {
  id: "019e6245-a70d-7b81-826f-6aa954b6837c",
  pageTypeSlug: "temper-skill",
  slug: "resistant-flesh",
  title: "Resistant Flesh",
  key: "resistant-flesh",
  baseName: "Render Flesh",
  description:
    '"Sacrifice your own power to repair damaged flesh, healing you or an ally in front of you for 3600 Health but applying Minor Defile to yourself for 4 seconds, reducing your healing received and damage shield strength by 6%.\\n\\nYou grant the target Spell and Physical Resistance equal to half the amount healed for 3 seconds."',
  icon: "/esoui/art/icons/ability_necromancer_013_a.dds",
  esoSkillId: 40117883,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
