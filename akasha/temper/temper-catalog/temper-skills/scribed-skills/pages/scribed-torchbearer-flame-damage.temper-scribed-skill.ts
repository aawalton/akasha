import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTorchbearerFlameDamage = {
  id: "019e6471-15ce-772b-ab6e-69c255cdd8da",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-torchbearer-flame-damage",
  title: "Fiery Torch",
  key: "scribed-torchbearer-flame-damage",
  baseName: "Torchbearer",
  description:
    "Deals 1335 Flame Damage to enemies with each sweep. Beneficial Signature and Affix scripts only apply to you.",
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
  focusScriptId: "flame-damage",
  grimoireId: "torchbearer",
} as const satisfies TemperScribedSkill
