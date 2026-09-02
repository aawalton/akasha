import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSoulBurstFlameDamage = {
  id: "01a05fd2-7c49-7519-af6c-eaa2c04a5491",
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
