import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceFalconSSwiftness = {
  id: "01a05fd1-d2a2-7621-ad92-f51ff5d19040",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-falcon-s-swiftness",
  title: "Vengeance Falcon's Swiftness",
  key: "vengeance-falcon-s-swiftness",
  baseName: "Vengeance Falcon's Swiftness",
  description:
    '"Invoke the spirit of agility to gain Major Expedition for |cffffff6|r seconds, increasing your Movement Speed by |cffffff30|r%."',
  icon: "/esoui/art/icons/ability_warden_016.dds",
  esoSkillId: 238027,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-animal-companions",
  skillType: "active",
  subcategoryId: "vengeance-warden-animal-companions",
} as const satisfies TemperSkill
