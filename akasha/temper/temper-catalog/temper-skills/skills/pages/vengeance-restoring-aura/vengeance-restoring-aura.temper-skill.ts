import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceRestoringAura = {
  id: "019e6f53-a965-75a2-8731-7d5ddc9d09a9",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-restoring-aura",
  title: "Vengeance Restoring Aura",
  key: "vengeance-restoring-aura",
  baseName: "Vengeance Restoring Aura",
  description:
    '"Champion the cause of divine glory to apply Minor Endurance, Minor Fortitude, and Minor Intellect to nearby group members for |cffffff20|r seconds, increasing Health, Magicka, and Stamina Recovery by |cffffff15|r%."',
  icon: "/esoui/art/icons/ability_templar_restoring_sigil.dds",
  esoSkillId: 238019,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-restoring-light",
  skillType: "active",
  subcategoryId: "vengeance-templar-restoring-light",
} as const satisfies TemperSkill
