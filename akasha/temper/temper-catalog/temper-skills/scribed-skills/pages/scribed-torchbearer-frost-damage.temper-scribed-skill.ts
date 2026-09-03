import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTorchbearerFrostDamage = {
  id: "019e6471-15cf-762c-a2cb-b3a2210b379d",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-torchbearer-frost-damage",
  title: "Chilling Torch",
  key: "scribed-torchbearer-frost-damage",
  baseName: "Torchbearer",
  description:
    "Deals 1335 Frost Damage to enemies with each sweep. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_fightersguild.dds",
  esoSkillId: 217637,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "frost-damage",
  grimoireId: "torchbearer",
} as const satisfies TemperScribedSkill
