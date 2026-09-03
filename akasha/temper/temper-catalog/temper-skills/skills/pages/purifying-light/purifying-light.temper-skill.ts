import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const purifyingLight = {
  id: "019e6245-a6f6-784f-b09b-f39fb426b3d4",
  pageTypeSlug: "temper-skill",
  slug: "purifying-light",
  title: "Purifying Light",
  key: "purifying-light",
  baseName: "Backlash",
  description:
    '"Summon an expanding beam of pure sunlight to doom an enemy, dealing 1161 Magic Damage immediately and marking them for 6 seconds.\\n\\nAfter the duration ends, the sunlight bursts, dealing 1285 Magic Damage, which increases based on the amount of damage you dealt to them over the duration, up to 200%. Also heals you and nearby allies in the area for 599 Health every 2 seconds, over 10 seconds.\\n\\nYou can have only one Purifying Light at a time."',
  icon: "/esoui/art/icons/ability_templar_purifying_light.dds",
  esoSkillId: 27558,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
