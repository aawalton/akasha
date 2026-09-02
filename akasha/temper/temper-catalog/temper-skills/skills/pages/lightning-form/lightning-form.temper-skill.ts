import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lightningForm = {
  id: "01a05fd1-2de6-798c-8120-d74f0cb8ddb1",
  pageTypeSlug: "temper-skill",
  slug: "lightning-form",
  title: "Lightning Form",
  key: "lightning-form",
  baseName: "Lightning Form",
  description:
    '"Manifest yourself as pure lightning, zapping nearby enemies with electricity dealing |cffffff1613|r Shock Damage every |cffffff2|r seconds for |cffffff20|r seconds.  \\n\\nWhile in this form you also gain Major Resolve, increasing your Physical Resistance and Spell Resistance by |cffffff5948|r."',
  icon: "/esoui/art/icons/ability_sorcerer_lightning_form.dds",
  esoSkillId: 23210,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
