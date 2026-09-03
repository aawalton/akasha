import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTorchbearerHealing = {
  id: "019e6471-15d1-7354-9eac-080b61ce74b7",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-torchbearer-healing",
  title: "Healing Torch",
  key: "scribed-torchbearer-healing",
  baseName: "Torchbearer",
  description:
    "Heals you and your allies for 2004 Health with each sweep. Beneficial Signature and Affix scripts apply to you and your allies.",
  icon: "/esoui/art/icons/ability_grimoire_fightersguild.dds",
  esoSkillId: 217607,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "healing",
  grimoireId: "torchbearer",
} as const satisfies TemperScribedSkill
