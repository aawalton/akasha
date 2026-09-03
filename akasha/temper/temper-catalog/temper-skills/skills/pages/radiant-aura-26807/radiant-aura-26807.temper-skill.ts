import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const radiantAura26807 = {
  id: "019e6f53-a57d-7cf7-bb21-06a49d809ea8",
  pageTypeSlug: "temper-skill",
  slug: "radiant-aura-26807",
  title: "Radiant Aura",
  key: "radiant-aura-26807",
  baseName: "Restoring Aura",
  description:
    '"Champion the cause of divine glory to apply Minor Endurance, Minor Fortitude, and Minor Intellect to you and nearby group members for |cffffff1|r minute, increasing your Health, Magicka, and Stamina Recovery by |cffffff15|r%.\\n\\nWhile slotted on either bar you gain these effects."',
  icon: "/esoui/art/icons/ability_templar_life_giving_sigil.dds",
  esoSkillId: 26807,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
