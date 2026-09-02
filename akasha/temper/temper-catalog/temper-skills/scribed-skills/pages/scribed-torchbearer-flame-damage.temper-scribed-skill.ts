import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTorchbearerFlameDamage = {
  id: "01a05fd2-7c4c-7f2d-bc5f-5881c6ce0b64",
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
