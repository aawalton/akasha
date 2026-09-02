import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSoulBurstHealing = {
  id: "01a05fd2-7c4a-701a-b8ad-2e93a5ab027e",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-soul-burst-healing",
  title: "Healing Burst",
  key: "scribed-soul-burst-healing",
  baseName: "Soul Burst",
  description:
    "Heals you and your allies for 2614 Health. Beneficial Signature and Affix scripts apply to you and your allies.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic2.dds",
  esoSkillId: 217462,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "healing",
  grimoireId: "soul-burst",
} as const satisfies TemperScribedSkill
