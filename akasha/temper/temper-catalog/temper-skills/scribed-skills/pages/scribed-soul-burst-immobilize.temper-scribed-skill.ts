import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSoulBurstImmobilize = {
  id: "01a05fd2-7c4a-77df-b8e6-6e2a16476250",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-soul-burst-immobilize",
  title: "Binding Burst",
  key: "scribed-soul-burst-immobilize",
  baseName: "Soul Burst",
  description:
    "Immobilizes enemies for 3 seconds. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic2.dds",
  esoSkillId: 217978,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "immobilize",
  grimoireId: "soul-burst",
} as const satisfies TemperScribedSkill
