import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hurricane23231 = {
  id: "01a05fd0-dcb9-7a9b-b741-1bb2708ec5f1",
  pageTypeSlug: "temper-skill",
  slug: "hurricane-23231",
  title: "Hurricane",
  key: "hurricane-23231",
  baseName: "Lightning Form",
  description:
    '"Manifest yourself as pure air, buffeting nearby enemies with wind dealing |cffffff1667|r Physical Damage every |cffffff2|r seconds for |cffffff20|r seconds. The winds grow in damage and size, increasing up to |cffffff120|r% more damage and up to |cffffff9|r meters in size.\\n\\nWhile in this form you gain Major Resolve and Minor Expedition, increasing your Physical and Spell Resistance by |cffffff5948|r and your Movement Speed by |cffffff15|r%."',
  icon: "/esoui/art/icons/ability_sorcerer_thundering_presence.dds",
  esoSkillId: 23231,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
