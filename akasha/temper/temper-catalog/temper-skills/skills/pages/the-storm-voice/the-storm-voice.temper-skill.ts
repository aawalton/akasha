import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const theStormVoice = {
  id: "01a05fd1-d266-7504-a4d8-3c37818fcfde",
  pageTypeSlug: "temper-skill",
  slug: "the-storm-voice",
  title: "The Storm Voice",
  key: "the-storm-voice",
  baseName: "The Storm Voice",
  description:
    '"The syllables of that ancient tongue live in the mouth of every Dragonknight.\\n\\nWhen you cast an Ultimate ability, you restore |cffffff8|r Health, |cffffff8|r Magicka, and |cffffff8|r Stamina for each point of the Ultimate spent. Each Dragonknight ability slotted increases this value by |cffffff3|r.\\n\\nCurrent amount:\\n|cffffff8|r Health\\n|cffffff8|r Magicka \\n|cffffff8|r Stamina"',
  icon: "/esoui/art/icons/ability_dragonknight_031.dds",
  esoSkillId: 29462,
  isMorph: false,
  learnedLevel: 39,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 39,
  skillLineId: "dragonknight-draconic-power",
  skillType: "passive",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
