import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const undeath = {
  id: "01a05fd1-d27b-798b-a34b-70226a53ca47",
  pageTypeSlug: "temper-skill",
  slug: "undeath",
  title: "Undeath",
  key: "undeath",
  baseName: "Undeath",
  description:
    '"Reduces your damage taken by up to 15% based on your missing Health.\\n\\nCurrent bonus: 1%"',
  icon: "/esoui/art/icons/passive_u26_vampire_03.dds",
  esoSkillId: 33090,
  isMorph: false,
  learnedLevel: 9,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-vampire",
  skillType: "passive",
  subcategoryId: "world-vampire",
  status: "unsupported",
} as const satisfies TemperSkill
