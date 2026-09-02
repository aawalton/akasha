import type { TemperSkill } from "../temper-skill.page-type.ts"

export const tanglingWebs42012 = {
  id: "01a05fd1-d260-7f79-b69d-7426e2e15f86",
  pageTypeSlug: "temper-skill",
  slug: "tangling-webs-42012",
  title: "Tangling Webs",
  key: "tangling-webs-42012",
  baseName: "Trapping Webs",
  description:
    '"Hurl webs to ensnare your foes, reducing the Movement Speed of enemies in the area by |cffffff50|r% and dealing |cffffff6401|r Physical Damage. After |cffffff10|r seconds the webs explode, dealing |cffffff8533|r Poison Damage to enemies within.\\n\\nA ranged ally can activate the Arachnophobia synergy on an affected enemy, dealing |cffffff7819|r Poison Damage to them, fearing them for |cffffff4|r seconds, and summoning a spider to attack for |cffffff10|r seconds. The spider bites enemies for |cffffff2346|r Physical Damage."',
  icon: "/esoui/art/icons/ability_undaunted_003_b.dds",
  esoSkillId: 42012,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
