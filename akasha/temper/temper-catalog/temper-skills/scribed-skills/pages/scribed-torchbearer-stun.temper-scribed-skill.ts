import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedTorchbearerStun = {
  id: "01a05fd2-7c4d-7458-83a7-7bafe47390fd",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-torchbearer-stun",
  title: "Dazing Torch",
  key: "scribed-torchbearer-stun",
  baseName: "Torchbearer",
  description:
    "Reduces the Movement Speed of enemies by 40% for 4 seconds on the first sweep, immobilizes for 3 seconds on the second sweep, and stuns for 3 seconds on the third sweep. Beneficial Signature and Affix scripts only apply to you.",
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
  focusScriptId: "stun",
  grimoireId: "torchbearer",
} as const satisfies TemperScribedSkill
