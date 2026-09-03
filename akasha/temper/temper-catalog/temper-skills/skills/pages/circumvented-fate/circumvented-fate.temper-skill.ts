import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const circumventedFate = {
  id: "019e6245-a61d-7791-8cf0-c818f2bb3ff1",
  pageTypeSlug: "temper-skill",
  slug: "circumvented-fate",
  title: "Circumvented Fate",
  key: "circumvented-fate",
  baseName: "Circumvented Fate",
  description:
    '"Casting an Arcanist ability warps the weave of fate around you, granting you and your group members Minor Evasion for 20 seconds and reducing damage from area attacks by 10%. This effect can occur once every 5 seconds."',
  icon: "/esoui/art/icons/passive_arcanist_06.dds",
  esoSkillId: 184932,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "passive",
  subcategoryId: "arcanist-soldier-of-apocrypha",
  status: "unsupported",
} as const satisfies TemperSkill
