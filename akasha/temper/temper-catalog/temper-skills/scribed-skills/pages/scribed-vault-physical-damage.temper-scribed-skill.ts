import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedVaultPhysicalDamage = {
  id: "01a05fd2-7c56-7d61-a103-ca723d66f40b",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-vault-physical-damage",
  title: "Sundering Vault",
  key: "scribed-vault-physical-damage",
  baseName: "Vault",
  description:
    "Deals 1742 Physical Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
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
  focusScriptId: "physical-damage",
  grimoireId: "vault",
} as const satisfies TemperScribedSkill
