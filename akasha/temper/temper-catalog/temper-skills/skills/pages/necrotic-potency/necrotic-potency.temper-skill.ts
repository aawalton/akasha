import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const necroticPotency = {
  id: "019e6245-a6da-755e-b740-75d4663f5624",
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
  effects: "jsonl",
} as const satisfies TemperSkill
