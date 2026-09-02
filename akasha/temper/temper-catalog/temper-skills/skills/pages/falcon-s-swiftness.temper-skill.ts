import type { TemperSkill } from "../temper-skill.page-type.ts"

export const falconSSwiftness = {
  id: "01a05fd0-8e30-7ec6-88c7-680591526747",
  pageTypeSlug: "temper-skill",
  slug: "falcon-s-swiftness",
  title: "Falcon's Swiftness",
  key: "falcon-s-swiftness",
  baseName: "Falcon's Swiftness",
  description:
    '"Invoke the spirit of agility to gain Major Expedition for |cffffff6|r seconds, increasing your Movement Speed by |cffffff30|r%.\\n\\nGain immunity to snares and immobilizations for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_warden_016.dds",
  esoSkillId: 86037,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "warden-animal-companions",
  skillType: "active",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
