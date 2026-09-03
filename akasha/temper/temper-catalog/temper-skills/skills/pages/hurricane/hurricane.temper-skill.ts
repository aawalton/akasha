import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hurricane = {
  id: "019e6245-a6a9-7288-8059-e2f2372561d8",
  pageTypeSlug: "temper-skill",
  slug: "hurricane",
  title: "Hurricane",
  key: "hurricane",
  baseName: "Lightning Form",
  description:
    '"Manifest yourself as pure air, buffeting nearby enemies with wind dealing 478 Physical Damage every 2 seconds for 20 seconds. The winds grow in damage and size, increasing up to 120% more damage and up to 9 meters in size.\\n\\nWhile in this form you gain Major Resolve and Minor Expedition, increasing your Physical and Spell Resistance by 5948 and your Movement Speed by 15%."',
  icon: "/esoui/art/icons/ability_sorcerer_thundering_presence.dds",
  esoSkillId: 30244,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
