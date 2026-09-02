import type { TemperSkill } from "../temper-skill.page-type.ts"

export const rapidFire = {
  id: "01a05fd1-2e2a-717b-aa19-176914d0addf",
  pageTypeSlug: "temper-skill",
  slug: "rapid-fire",
  title: "Rapid Fire",
  key: "rapid-fire",
  baseName: "Rapid Fire",
  description:
    '"Unleash a barrage of arrows at an enemy, dealing |cffffff60561|r Physical Damage over |cffffff4|r seconds. \\n\\nYou can move at full speed and are immune to all disabling effects while channeling this attack.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_bow_006.dds",
  esoSkillId: 83465,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 50,
  skillLineId: "weapon-bow",
  skillType: "ultimate",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
