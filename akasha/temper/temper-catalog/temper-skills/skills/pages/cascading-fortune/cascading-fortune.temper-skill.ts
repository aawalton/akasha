import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cascadingFortune = {
  id: "019e6245-a610-73bd-93f8-0b8b44e5636f",
  pageTypeSlug: "temper-skill",
  slug: "cascading-fortune",
  title: "Cascading Fortune",
  key: "cascading-fortune",
  baseName: "Remedy Cascade",
  description:
    '"Channel the abyssal sea to coalesce a beam that heals you and your allies in its path for 11674 Health over 4.5 seconds.\\n\\nThe beam heals for up to 50% more in proportion to the severity of the target\'s wounds as you reweave fate itself.\\n\\nConsume Crux to also restore 728 Magicka and Stamina per Crux spent to your allies over 4.5 seconds."',
  icon: "/esoui/art/icons/ability_arcanist_014_a.dds",
  esoSkillId: 40186193,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "active",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
