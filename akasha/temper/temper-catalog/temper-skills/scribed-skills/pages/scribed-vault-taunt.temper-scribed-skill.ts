import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedVaultTaunt = {
  id: "019e6471-15f2-7ff2-bfbd-1577e214d57f",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-vault-taunt",
  title: "Goading Vault",
  key: "scribed-vault-taunt",
  baseName: "Vault",
  description:
    "Deals 870 Physical Damage to enemies and taunts one of them to attack you for 15 seconds. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_bow.dds",
  esoSkillId: 216674,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "taunt",
  grimoireId: "vault",
} as const satisfies TemperScribedSkill
