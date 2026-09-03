import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedWieldSoulBleedDamage = {
  id: "019e6471-15f4-70ba-98d6-f7391c61239e",
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
