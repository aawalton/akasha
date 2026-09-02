import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const refreshingPath36028 = {
  id: "01a05fd1-7c80-7061-9c12-dce937714774",
  pageTypeSlug: "temper-skill",
  slug: "refreshing-path-36028",
  title: "Refreshing Path",
  key: "refreshing-path-36028",
  baseName: "Path of Darkness",
  description:
    '"Create a corridor of shadows for |cffffff10|r seconds, granting you and allies in the area Major Expedition, Minor Endurance, and Minor Intellect, increasing Movement Speed by |cffffff30|r%, as well as Stamina and Magicka Recovery by |cffffff15|r%. Effect persists for |cffffff4|r seconds after leaving the path.\\n\\nHeals |cffffff1371|r Health to you and allies in the area every |cffffff1|r second."',
  icon: "/esoui/art/icons/ability_nightblade_010_a.dds",
  esoSkillId: 36028,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
