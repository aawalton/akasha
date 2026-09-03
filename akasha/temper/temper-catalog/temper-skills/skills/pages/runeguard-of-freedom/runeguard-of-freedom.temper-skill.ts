import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runeguardOfFreedom = {
  id: "019e6245-a71b-7ae2-ad6f-9d4a44f1bf6d",
  pageTypeSlug: "temper-skill",
  slug: "runeguard-of-freedom",
  title: "Runeguard of Freedom",
  key: "runeguard-of-freedom",
  baseName: "Runic Defense",
  description:
    '"Cast forth a complex rune granting you and your group members Minor Resolve for 20 seconds, increasing your Armor by 2974.\\n\\nYou gain Minor Protection for 20 seconds, reducing your damage taken by 5%.\\n\\nThe first time you are damaged while below 50% Health, Minor Protection is consumed to heal you for 2400 Health, scaling off your Max Health, and gain 3300 Armor and Crowd Control Immunity for 7 seconds. This immunity can occur once every 30 seconds."',
  icon: "/esoui/art/icons/ability_arcanist_010_b.dds",
  esoSkillId: 40186489,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
