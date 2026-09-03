import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const repentance = {
  id: "019e6245-a70c-7a87-a019-123628e09060",
  pageTypeSlug: "temper-skill",
  slug: "repentance",
  title: "Repentance",
  key: "repentance",
  baseName: "Restoring Aura",
  description:
    '"Consecrate the souls of the fallen, healing you and your allies for 3000 Health and restoring 3000 Stamina to you for each corpse nearby.\\n\\nWhile slotted on either bar, you gain Minor Fortitude, Minor Endurance, and Minor Intellect, increasing your Health, Stamina, and Magicka Recovery by 15%."',
  icon: "/esoui/art/icons/ability_templar_persistant_sigil.dds",
  esoSkillId: 27043,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-restoring-light",
  skillType: "active",
  subcategoryId: "templar-restoring-light",
  effects: "jsonl",
} as const satisfies TemperSkill
