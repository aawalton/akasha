import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const curativeSurge = {
  id: "019e6245-a62e-7ece-8f2b-018d83f6b09d",
  pageTypeSlug: "temper-skill",
  slug: "curative-surge",
  title: "Curative Surge",
  key: "curative-surge",
  baseName: "Remedy Cascade",
  description:
    '"Channel the abyssal sea to coalesce a beam that heals you and your allies in its path for 11674 Health over 4.5 seconds.\\n\\nThe beam gradually grows stronger the longer you channel it, healing for up to 192% more at the end of its duration.\\n\\nConsume Crux to also restore 728 Magicka and Stamina per Crux spent to your allies over 4.5 seconds."',
  icon: "/esoui/art/icons/ability_arcanist_014_b.dds",
  esoSkillId: 40186200,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
