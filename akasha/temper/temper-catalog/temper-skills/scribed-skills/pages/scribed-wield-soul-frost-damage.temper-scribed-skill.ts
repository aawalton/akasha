import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedWieldSoulFrostDamage = {
  id: "01a05fd2-7c58-73aa-93c5-27edcd50930e",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-wield-soul-frost-damage",
  title: "Chilling Soul",
  key: "scribed-wield-soul-frost-damage",
  baseName: "Wield Soul",
  description:
    "Deals 2091 Frost Damage to an enemy. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic1.dds",
  esoSkillId: 215731,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "frost-damage",
  grimoireId: "wield-soul",
} as const satisfies TemperScribedSkill
