import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mountainGiant = {
  id: "01a05fd1-2e02-7440-8855-933e7383310b",
  pageTypeSlug: "temper-skill",
  slug: "mountain-giant",
  title: "Mountain Giant",
  key: "mountain-giant",
  baseName: "Mountain Giant",
  description:
    '"The strength of mountains fuels your mightiest blows.\\n\\nDealing damage with a fully-charged Heavy Attack also applies Off Balance to the target."',
  icon: "/esoui/art/icons/ability_dragonknight_034.dds",
  esoSkillId: 29475,
  isMorph: false,
  learnedLevel: 39,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 39,
  skillLineId: "dragonknight-earthen-heart",
  skillType: "passive",
  subcategoryId: "dragonknight-earthen-heart",
} as const satisfies TemperSkill
