import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSoulBurstFrostDamage = {
  id: "01a05fd2-7c49-70d4-aac0-1e8d4156b078",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-soul-burst-frost-damage",
  title: "Chilling Burst",
  key: "scribed-soul-burst-frost-damage",
  baseName: "Soul Burst",
  description:
    "Deals 1742 Frost Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic2.dds",
  esoSkillId: 217459,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "frost-damage",
  grimoireId: "soul-burst",
} as const satisfies TemperScribedSkill
