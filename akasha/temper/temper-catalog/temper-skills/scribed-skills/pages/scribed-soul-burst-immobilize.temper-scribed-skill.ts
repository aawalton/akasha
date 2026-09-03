import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSoulBurstImmobilize = {
  id: "019e6471-15c8-79f2-b18b-83fab0cc8bfa",
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
