import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSoulBurstFlameDamage = {
  id: "019e6471-15c5-7e9b-bb34-0231a2745f89",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-soul-burst-flame-damage",
  title: "Fiery Burst",
  key: "scribed-soul-burst-flame-damage",
  baseName: "Soul Burst",
  description:
    "Deals 1742 Flame Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
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
  focusScriptId: "flame-damage",
  grimoireId: "soul-burst",
} as const satisfies TemperScribedSkill
