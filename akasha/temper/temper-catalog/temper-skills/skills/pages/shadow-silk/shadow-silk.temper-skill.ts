import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shadowSilk = {
  id: "019e6238-c30b-70ef-9f08-9f26435f974f",
  pageTypeSlug: "temper-skill",
  slug: "shadow-silk",
  title: "Shadow Silk",
  key: "shadow-silk",
  baseName: "Trapping Webs",
  description:
    '"Hurl webs to ensnare your foes, reducing the Movement Speed of enemies in the area by 50% and dealing 1799 Physical Damage. After 10 seconds the webs explode, dealing 2399 Poison Damage to enemies within.\\n\\nA ranged ally can activate the Black Widow synergy on an affected enemy, dealing 2249 Poison Damage to them and summoning a spider to attack for 10 seconds. The spider bites enemies for 673 Physical Damage and can poison them for 4488 Poison Damage over 10 seconds."',
  icon: "/esoui/art/icons/ability_undaunted_003_a.dds",
  esoSkillId: 43489,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
