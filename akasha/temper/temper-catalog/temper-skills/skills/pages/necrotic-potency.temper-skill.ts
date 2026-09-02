import type { TemperSkill } from "../temper-skill.page-type.ts"

export const necroticPotency = {
  id: "01a05fd1-2e06-73da-afd8-79f6c2ca23c6",
  pageTypeSlug: "temper-skill",
  slug: "necrotic-potency",
  title: "Necrotic Potency",
  key: "necrotic-potency",
  baseName: "Bitter Harvest",
  description:
    '"Sap the lingering life from fresh corpses, granting you 6 Ultimate and healing 682 Health every 1 second for 2 seconds per additional corpse. This ability scales off your Max Health.\\n\\nWhile slotted, your damage taken is reduced by 3%."',
  icon: "/esoui/art/icons/ability_necromancer_011_b.dds",
  esoSkillId: 40118639,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
