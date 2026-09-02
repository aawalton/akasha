import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceWingedTwilight = {
  id: "01a05fd2-1e90-72bf-8e5f-096f7b7c0af8",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-winged-twilight",
  title: "Vengeance Winged Twilight",
  key: "vengeance-winged-twilight",
  baseName: "Vengeance Winged Twilight",
  description:
    '"Call on Azura to send a blessing to heal a friendly ally for |cffffff16065|r Health and yourself for |cffffff8033|r Health."',
  icon: "/esoui/art/icons/ability_sorcerer_storm_prey_summoned.dds",
  esoSkillId: 237915,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "vengeance-sorcerer-daedric-summoning",
} as const satisfies TemperSkill
