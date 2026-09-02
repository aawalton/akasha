import type { TemperSkill } from "../temper-skill.page-type.ts"

export const chainsOfDevastationDraconic = {
  id: "01a05fd0-438b-75df-891d-af8bc7417cfc",
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
