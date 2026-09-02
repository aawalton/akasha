import type { TemperSkill } from "../temper-skill.page-type.ts"

export const undeath33093 = {
  id: "01a05fd1-d27c-7b84-a5c8-fc0dbe686dd2",
  pageTypeSlug: "temper-skill",
  slug: "undeath-33093",
  title: "Undeath",
  key: "undeath-33093",
  baseName: "Undeath",
  description:
    '"Reduces your damage taken by up to |cffffff7|r% based on your missing Health.\\n\\nCurrent bonus: |cffffff1|r%"',
  icon: "/esoui/art/icons/passive_u26_vampire_03.dds",
  esoSkillId: 33093,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "world-vampire",
  skillType: "passive",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
