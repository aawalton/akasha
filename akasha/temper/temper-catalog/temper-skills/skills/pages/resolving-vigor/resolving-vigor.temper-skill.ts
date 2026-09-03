import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const resolvingVigor = {
  id: "019e6251-4cdf-7613-9744-b1641dc991a1",
  pageTypeSlug: "temper-skill",
  slug: "resolving-vigor",
  title: "Resolving Vigor",
  key: "resolving-vigor",
  baseName: "Vigor",
  description:
    '"Let loose a battle cry, instilling yourself with resolve and healing for 5388 Health over 5 seconds.\\n\\nAfter casting you gain Minor Resolve, increasing your Physical and Spell Resistance by 2974, for 20 seconds."',
  icon: "/esoui/art/icons/ability_ava_resolving_vigor.dds",
  esoSkillId: 63255,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 12,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
