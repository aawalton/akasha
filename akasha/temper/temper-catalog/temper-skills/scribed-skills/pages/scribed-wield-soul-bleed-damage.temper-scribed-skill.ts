import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedWieldSoulBleedDamage = {
  id: "01a05fd2-7c57-73be-a001-153aeef67b02",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-wield-soul-bleed-damage",
  title: "Bloody Soul",
  key: "scribed-wield-soul-bleed-damage",
  baseName: "Wield Soul",
  description:
    "Deals 2091 Bleed Damage to an enemy. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic1.dds",
  esoSkillId: 219780,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "bleed-damage",
  grimoireId: "wield-soul",
} as const satisfies TemperScribedSkill
