import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bloodRitual = {
  id: "019e6251-4c91-7a95-b9e5-e602cb4e3122",
  pageTypeSlug: "temper-skill",
  slug: "blood-ritual",
  title: "Blood Ritual",
  key: "blood-ritual",
  baseName: "Blood Ritual",
  description:
    '"Allows you to infect another player with Noxiphilic Sanguivoria once every week by returning to the Vampire ritual site. \\n\\nPlayers already infected with Lycanthropy cannot be infected with Noxiphilic Sanguivoria."',
  icon: "/esoui/art/icons/passive_u26_vampire_05.dds",
  esoSkillId: 33091,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-vampire",
  skillType: "passive",
  subcategoryId: "world-vampire",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
