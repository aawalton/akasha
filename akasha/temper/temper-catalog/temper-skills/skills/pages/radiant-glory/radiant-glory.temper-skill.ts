import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const radiantGlory = {
  id: "019e6245-a6f8-7aa2-a226-45c3f25a1754",
  pageTypeSlug: "temper-skill",
  slug: "radiant-glory",
  title: "Radiant Glory",
  key: "radiant-glory",
  baseName: "Radiant Destruction",
  description:
    '"Burn an enemy with a ray of holy fire, dealing 7482 Magic Damage over 3.8 seconds. Deals up to 500% more damage to enemies below 33% Health.\\n\\nYou heal for 15% of the damage inflicted.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_templar_under_exposure.dds",
  esoSkillId: 63066,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
