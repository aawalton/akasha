import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceDefensivePosture = {
  id: "019e6f53-a8ea-7fd5-8ac1-68d192731ce9",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-defensive-posture",
  title: "Vengeance Defensive Posture",
  key: "vengeance-defensive-posture",
  baseName: "Vengeance Defensive Posture",
  description:
    '"Bolster your defenses, gaining a damage shield that absorbs up to |cffffff6802|r damage for |cffffff6|r seconds.  This portion of the ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_1handed_004.dds",
  esoSkillId: 240560,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "vengeance-weapon-one-hand-and-shield",
} as const satisfies TemperSkill
