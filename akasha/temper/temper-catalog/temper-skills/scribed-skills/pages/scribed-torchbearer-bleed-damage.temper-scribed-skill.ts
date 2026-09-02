import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTorchbearerBleedDamage = {
  id: "01a05fd2-7c4c-7446-967c-e758d15c62a3",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-torchbearer-bleed-damage",
  title: "Bloody Torch",
  key: "scribed-torchbearer-bleed-damage",
  baseName: "Torchbearer",
  description:
    "Deals 1335 Bleed Damage to enemies with each sweep. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_fightersguild.dds",
  esoSkillId: 217630,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "bleed-damage",
  grimoireId: "torchbearer",
} as const satisfies TemperScribedSkill
