import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedVaultPoisonDamage = {
  id: "019e6471-15f2-7166-97a0-626767b001d8",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-vault-poison-damage",
  title: "Venomous Vault",
  key: "scribed-vault-poison-damage",
  baseName: "Vault",
  description:
    "Deals 1742 Poison Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
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
  focusScriptId: "poison-damage",
  grimoireId: "vault",
} as const satisfies TemperScribedSkill
