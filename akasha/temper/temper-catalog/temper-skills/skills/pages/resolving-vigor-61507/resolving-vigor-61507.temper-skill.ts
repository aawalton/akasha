import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const resolvingVigor61507 = {
  id: "01a05fd1-7c90-75cb-9a33-d29baf059020",
  pageTypeSlug: "temper-skill",
  slug: "resolving-vigor-61507",
  title: "Resolving Vigor",
  key: "resolving-vigor-61507",
  baseName: "Vigor",
  description:
    '"Let loose a battle cry, instilling yourself with resolve and healing for |cffffff16968|r Health over |cffffff5|r seconds.\\n\\nAfter casting you gain Minor Resolve, increasing your Physical and Spell Resistance by |cffffff2974|r, for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_ava_resolving_vigor.dds",
  esoSkillId: 61507,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
