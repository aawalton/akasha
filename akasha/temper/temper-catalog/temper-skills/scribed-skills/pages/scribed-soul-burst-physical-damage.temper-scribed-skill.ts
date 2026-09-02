import type { TemperScribedSkill } from "../temper-scribed-skill.page-type.ts"

export const scribedSoulBurstPhysicalDamage = {
  id: "01a05fd2-7c4a-7eeb-a087-f255b7b44ef3",
  pageTypeSlug: "temper-scribed-skill",
  slug: "scribed-soul-burst-physical-damage",
  title: "Sundering Burst",
  key: "scribed-soul-burst-physical-damage",
  baseName: "Soul Burst",
  description:
    "Deals 1742 Physical Damage to enemies. Beneficial Signature and Affix scripts only apply to you.",
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
  focusScriptId: "physical-damage",
  grimoireId: "soul-burst",
} as const satisfies TemperScribedSkill
