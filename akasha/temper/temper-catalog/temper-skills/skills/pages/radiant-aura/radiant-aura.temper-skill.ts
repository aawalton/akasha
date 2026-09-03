import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const radiantAura = {
  id: "019e6245-a6f7-79fb-b2b9-cc9bb1eca7d8",
  pageTypeSlug: "temper-skill",
  slug: "radiant-aura",
  title: "Radiant Aura",
  key: "radiant-aura",
  baseName: "Restoring Aura",
  description:
    '"Champion the cause of divine glory to apply Minor Endurance, Minor Fortitude, and Minor Intellect to you and nearby group members for 1 minute, increasing your Health, Magicka, and Stamina Recovery by 15%.\\n\\nWhile slotted on either bar you gain these effects."',
  icon: "/esoui/art/icons/ability_templar_life_giving_sigil.dds",
  esoSkillId: 27030,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
  effects: "jsonl",
} as const satisfies TemperSkill
