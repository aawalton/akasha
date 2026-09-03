import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedWieldSoulPull = {
  id: "019e6471-15fb-70b3-adcd-69a56cde896d",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-wield-soul-pull",
  title: "Leashing Soul",
  key: "scribed-wield-soul-pull",
  baseName: "Wield Soul",
  description:
    "Deals 1045 Magic Damage to an enemy, pulls them to you, and taunts them for 15 seconds if they are not already taunted. Beneficial Signature and Affix scripts only apply to you. This attack cannot be reflected.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic1.dds",
  esoSkillId: 217784,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "pull",
  grimoireId: "wield-soul",
} as const satisfies TemperScribedSkill
