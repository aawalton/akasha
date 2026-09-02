import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedMendersBondImmobilize = {
  id: "01a05fd2-7c41-7530-822b-c13083b89b0e",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-menders-bond-immobilize",
  title: "Binding Bond",
  key: "scribed-menders-bond-immobilize",
  baseName: "Mender's Bond",
  description:
    "Removes and grants immunity to snares and immobilizations for 1 second to the ally and other allies in the link.",
  icon: "/esoui/art/icons/ability_grimoire_staffresto.dds",
  esoSkillId: 217257,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "immobilize",
  grimoireId: "menders-bond",
} as const satisfies TemperScribedSkill
