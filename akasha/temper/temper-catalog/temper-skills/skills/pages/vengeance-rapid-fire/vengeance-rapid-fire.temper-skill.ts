import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceRapidFire = {
  id: "019e6f53-a95c-7ca0-af41-b624eaa08106",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-rapid-fire",
  title: "Vengeance Rapid Fire",
  key: "vengeance-rapid-fire",
  baseName: "Vengeance Rapid Fire",
  description:
    '"Unleash a barrage of arrows at an enemy, dealing |cffffff59622|r Physical Damage over |cffffff3|r seconds. \\n\\nYou can move at full speed and are immune to all disabling effects while channeling this attack."',
  icon: "/esoui/art/icons/ability_bow_006.dds",
  esoSkillId: 241278,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-bow",
  skillType: "ultimate",
  subcategoryId: "vengeance-weapon-bow",
} as const satisfies TemperSkill
