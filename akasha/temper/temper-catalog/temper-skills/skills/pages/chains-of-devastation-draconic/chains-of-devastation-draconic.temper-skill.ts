import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const chainsOfDevastationDraconic = {
  id: "019e6245-a616-77c6-a84d-1f83eb12fbc3",
  pageTypeSlug: "temper-skill",
  slug: "chains-of-devastation-draconic",
  title: "Chains of Devastation",
  key: "chains-of-devastation-draconic",
  baseName: "Chains of Flame",
  description:
    '"Lash out with a chain bound in jagged links, pulling yourself to an enemy. The searing metal deals 5412 Flame Damage and applies the Burning status effect.\\n\\nThis attack cannot be dodged or reflected.\\n\\nHitting the target grants you Major Berserk for 6 seconds and Major Evasion for 10 seconds, increasing damage done by 10% reducing damage taken from area attacks by 20%."',
  icon: "/esoui/art/icons/ability_dragonknight_005_b.dds",
  esoSkillId: 20499,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
