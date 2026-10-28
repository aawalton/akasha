import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bloodmoon = {
  id: "019e6251-4c93-72f4-93c7-58f1c74dffcb",
  type: "page-type/temper-skill",
  slug: "bloodmoon",
  title: "Shadow of the Bloodmoon",
  key: "bloodmoon",
  baseName: "Shadow of the Bloodmoon",
  description:
    "The Great Hunt demands more participants. Become a shepard to the lamb who wishes to fight back.\n\nAllows you to infect another player with Lycanthropy once every |cffffffweek|r by returning to the Werewolf ritual site. \n\nPlayers already infected with Noxiphilic Sanguivoria cannot be infected with Lycanthropy.",
  icon: "/esoui/art/icons/ability_werewolf_008.dds",
  esoAbilityId: 32639,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/world-werewolf",
  skillType: "temper-skill-type/passive",
  hashPlace: 130,
  createdAt: "2026-05-26T03:25:55.731Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
