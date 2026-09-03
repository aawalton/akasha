import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const refreshingPath = {
  id: "019e6245-a704-737f-af23-91b34f6ff5b8",
  pageTypeSlug: "temper-skill",
  slug: "refreshing-path",
  title: "Refreshing Path",
  key: "refreshing-path",
  baseName: "Path of Darkness",
  description:
    '"Create a corridor of shadows for 10 seconds, granting you and allies in the area Major Expedition, Minor Endurance, and Minor Intellect, increasing Movement Speed by 30%, as well as Stamina and Magicka Recovery by 15%. Effect persists for 4 seconds after leaving the path.\\n\\nHeals 435 Health to you and allies in the area every 1 second."',
  icon: "/esoui/art/icons/ability_nightblade_010_a.dds",
  esoSkillId: 37816,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
