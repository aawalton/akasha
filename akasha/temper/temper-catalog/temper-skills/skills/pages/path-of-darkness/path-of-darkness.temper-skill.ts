import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const pathOfDarkness = {
  id: "019e6f53-a4e3-7179-b932-b126e464d773",
  pageTypeSlug: "temper-skill",
  slug: "path-of-darkness",
  title: "Path of Darkness",
  key: "path-of-darkness",
  baseName: "Path of Darkness",
  description:
    '"Create a corridor of shadows for |cffffff10|r seconds, granting you and allies in the area Major Expedition, increasing Movement Speed by |cffffff30|r%. Effect persists for |cffffff4|r seconds after leaving the path."',
  icon: "/esoui/art/icons/ability_nightblade_010.dds",
  esoSkillId: 33195,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
