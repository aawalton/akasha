import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bloodmoon = {
  id: "019e6251-4c93-72f4-93c7-58f1c74dffcb",
  pageTypeSlug: "temper-skill",
  slug: "bloodmoon",
  title: "Shadow of the Bloodmoon",
  key: "bloodmoon",
  baseName: "Shadow of the Bloodmoon",
  description:
    '"The Great Hunt demands more participants. Become a shepard to the lamb who wishes to fight back.\\n\\nAllows you to infect another player with Lycanthropy once every |cffffffweek|r by returning to the Werewolf ritual site. \\n\\nPlayers already infected with Noxiphilic Sanguivoria cannot be infected with Lycanthropy."',
  icon: "/esoui/art/icons/ability_werewolf_008.dds",
  esoSkillId: 32639,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-werewolf",
  skillType: "passive",
  subcategoryId: "world-werewolf",
} as const satisfies TemperSkill
