import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedVaultHealing = {
  id: "01a05fd2-7c55-7759-bdec-9a961c6f4365",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-vault-healing",
  title: "Healing Vault",
  key: "scribed-vault-healing",
  baseName: "Vault",
  description:
    "Heals you and your allies for 2614 Health. Beneficial Signature and Affix scripts apply to you and your allies.",
  icon: "/esoui/art/icons/ability_grimoire_bow.dds",
  esoSkillId: 217777,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "healing",
  grimoireId: "vault",
} as const satisfies TemperScribedSkill
