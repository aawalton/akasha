import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bloodRitual = {
  id: "019e6251-4c91-7a95-b9e5-e602cb4e3122",
  type: "page-type/temper-skill",
  slug: "blood-ritual",
  title: "Blood Ritual",
  key: "blood-ritual",
  baseName: "Blood Ritual",
  description:
    "Allows you to infect another player with Noxiphilic Sanguivoria once every week by returning to the Vampire ritual site. \n\nPlayers already infected with Lycanthropy cannot be infected with Noxiphilic Sanguivoria.",
  icon: "/esoui/art/icons/passive_u26_vampire_05.dds",
  esoAbilityId: 33091,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 126,
  createdAt: "2026-05-26T03:25:55.729Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
