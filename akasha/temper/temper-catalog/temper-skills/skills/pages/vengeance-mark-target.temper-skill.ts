import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceMarkTarget = {
  id: "01a05fd2-1e77-7849-9f28-c33303d67146",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-mark-target",
  title: "Vengeance Mark Target",
  key: "vengeance-mark-target",
  baseName: "Vengeance Mark Target",
  description:
    '"Expose an enemy\'s weaknesses to afflict them with Major Breach, reducing their Physical Resistance and Spell Resistance by |cffffff5948|r for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_014.dds",
  esoSkillId: 237604,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-assassination",
  skillType: "active",
  subcategoryId: "vengeance-nightblade-assassination",
} as const satisfies TemperSkill
