import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceRushedCeremony = {
  id: "01a05fd2-1e84-7c69-ac77-e8697ce66671",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-rushed-ceremony",
  title: "Vengeance Rushed Ceremony",
  key: "vengeance-rushed-ceremony",
  baseName: "Vengeance Rushed Ceremony",
  description: '"Heal yourself or an ally for |cffffff16065|r Health."',
  icon: "/esoui/art/icons/ability_templar_rushed_ceremony.dds",
  esoSkillId: 238001,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-restoring-light",
  skillType: "active",
  subcategoryId: "vengeance-templar-restoring-light",
} as const satisfies TemperSkill
