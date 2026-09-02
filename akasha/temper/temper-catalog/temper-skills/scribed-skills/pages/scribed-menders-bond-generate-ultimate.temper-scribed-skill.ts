import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedMendersBondGenerateUltimate = {
  id: "01a05fd2-7c41-73e3-985c-2f44068bfb3e",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-menders-bond-generate-ultimate",
  title: "Heroic Bond",
  key: "scribed-menders-bond-generate-ultimate",
  baseName: "Mender's Bond",
  description: "Transfers 1 Ultimate from you to the ally every 1 second.",
  icon: "/esoui/art/icons/ability_grimoire_staffresto.dds",
  esoSkillId: 217294,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "generate-ultimate",
  grimoireId: "menders-bond",
} as const satisfies TemperScribedSkill
