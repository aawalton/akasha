import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTorchbearerPhysicalDamage = {
  id: "01a05fd2-7c4d-7aea-9c1e-e678a414fd41",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-torchbearer-physical-damage",
  title: "Sundering Torch",
  key: "scribed-torchbearer-physical-damage",
  baseName: "Torchbearer",
  description:
    "Deals 1335 Physical Damage to enemies with each sweep. Beneficial Signature and Affix scripts only apply to you.",
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
  focusScriptId: "physical-damage",
  grimoireId: "torchbearer",
} as const satisfies TemperScribedSkill
