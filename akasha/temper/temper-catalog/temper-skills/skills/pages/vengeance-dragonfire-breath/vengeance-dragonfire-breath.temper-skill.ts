import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceDragonfireBreath = {
  id: "01a05fd1-d29b-7eab-9c04-49b467834a24",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-dragonfire-breath",
  title: "Vengeance Dragonfire Breath",
  key: "vengeance-dragonfire-breath",
  baseName: "Vengeance Dragonfire Breath",
  description:
    '"Exhale a flaming blast in front of you, dealing |cffffff8820|r Flame Damage to up to 3 enemies and an additional |cffffff7875|r Flame Damage over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_004.dds",
  esoSkillId: 237615,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "vengeance-dragonknight-draconic-power",
} as const satisfies TemperSkill
