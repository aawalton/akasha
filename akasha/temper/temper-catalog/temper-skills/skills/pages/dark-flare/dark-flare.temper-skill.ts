import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const darkFlare = {
  id: "019e6245-a63b-7fa1-9d74-22fee4435380",
  pageTypeSlug: "temper-skill",
  slug: "dark-flare",
  title: "Dark Flare",
  key: "dark-flare",
  baseName: "Solar Flare",
  description:
    '"Conjure a ball of solar energy to heave at an enemy, dealing 2483 Magic Damage and increasing your damage done with class abilities by 5% for 10 seconds.\\n\\nAfflicts the target and enemies within 8 meters with Major Defile, reducing their healing received and damage shield strength by 12% for 4 seconds.\\n \\nAlso grants you Empower for 10 seconds, increasing the damage of your Heavy Attacks against monsters by 70%."',
  icon: "/esoui/art/icons/ability_templar_dark_flare.dds",
  esoSkillId: 24147,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
