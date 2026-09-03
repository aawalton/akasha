import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSoulBurstBleedDamage = {
  id: "019e6471-15c3-728c-ac1a-d6f516d0a109",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-soul-burst-bleed-damage",
  title: "Bloody Burst",
  key: "scribed-soul-burst-bleed-damage",
  baseName: "Soul Burst",
  description:
    "Deals 1742 Bleed Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
  icon: "/esoui/art/icons/ability_grimoire_soulmagic2.dds",
  esoSkillId: 217465,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-soul-magic",
  skillType: "active",
  subcategoryId: "scribed",
  focusScriptId: "bleed-damage",
  grimoireId: "soul-burst",
} as const satisfies TemperScribedSkill
