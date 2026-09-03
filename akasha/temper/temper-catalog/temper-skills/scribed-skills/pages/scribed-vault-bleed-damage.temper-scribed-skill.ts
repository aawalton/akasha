import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedVaultBleedDamage = {
  id: "019e6471-15ec-7cdb-af64-48628132bf0c",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-vault-bleed-damage",
  title: "Bloody Vault",
  key: "scribed-vault-bleed-damage",
  baseName: "Vault",
  description:
    "Deals 1742 Bleed Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_bow.dds",
  esoSkillId: 214960,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "bleed-damage",
  grimoireId: "vault",
} as const satisfies TemperScribedSkill
