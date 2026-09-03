import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceDrainPower = {
  id: "019e6f53-a8f7-73dd-accf-012d9f9ae628",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-drain-power",
  title: "Vengeance Drain Power",
  key: "vengeance-drain-power",
  baseName: "Vengeance Drain Power",
  description:
    '"Siphon the vigor from your enemies\' blood, dealing |cffffff8820|r Magic Damage to up to 3 nearby enemies.\\n\\nAfter activating you gain Minor Force, increasing your Critical Damage done by |cffffff10|r% for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_013.dds",
  esoSkillId: 237719,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-siphoning",
  skillType: "active",
  subcategoryId: "vengeance-nightblade-siphoning",
} as const satisfies TemperSkill
