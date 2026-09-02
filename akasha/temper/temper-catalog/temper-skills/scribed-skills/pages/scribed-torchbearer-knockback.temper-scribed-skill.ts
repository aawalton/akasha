import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTorchbearerKnockback = {
  id: "01a05fd2-7c4d-7acc-95ac-f911c79ef9f1",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-torchbearer-knockback",
  title: "Repelling Torch",
  key: "scribed-torchbearer-knockback",
  baseName: "Torchbearer",
  description:
    "Knocks enemies back 5 meters with each sweep. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_fightersguild.dds",
  esoSkillId: 217633,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "knockback",
  grimoireId: "torchbearer",
} as const satisfies TemperScribedSkill
