import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const boundlessStorm23213 = {
  id: "019e6f53-9f83-7059-99d6-b0acc39e840a",
  pageTypeSlug: "temper-skill",
  slug: "boundless-storm-23213",
  title: "Boundless Storm",
  key: "boundless-storm-23213",
  baseName: "Lightning Form",
  description:
    '"Manifest yourself as pure lightning, zapping nearby enemies with electricity dealing |cffffff1614|r Shock Damage every |cffffff2|r seconds for |cffffff30|r seconds.\\n\\nWhile in this form you also gain Major Resolve, increasing your Physical Resistance and Spell Resistance by |cffffff5948|r.\\n\\nActivating this grants you Major Expedition, increasing your Movement Speed by |cffffff30|r% for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_boundless_storm.dds",
  esoSkillId: 23213,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
