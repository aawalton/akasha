import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const repentance26821 = {
  id: "01a05fd1-7c8a-7090-a08a-3b2e82fdc790",
  pageTypeSlug: "temper-skill",
  slug: "repentance-26821",
  title: "Repentance",
  key: "repentance-26821",
  baseName: "Restoring Aura",
  description:
    '"Consecrate the souls of the fallen, healing you and your allies for |cffffff3060|r Health and restoring |cffffff3000|r Stamina to you for each corpse nearby.\\n\\nWhile slotted on either bar, you gain Minor Fortitude, Minor Endurance, and Minor Intellect, increasing your Health, Stamina, and Magicka Recovery by |cffffff15|r%."',
  icon: "/esoui/art/icons/ability_templar_persistant_sigil.dds",
  esoSkillId: 26821,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
} as const satisfies TemperSkill
