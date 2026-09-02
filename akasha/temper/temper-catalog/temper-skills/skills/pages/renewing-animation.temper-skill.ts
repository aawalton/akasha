import type { TemperSkill } from "../temper-skill.page-type.ts"

export const renewingAnimation = {
  id: "01a05fd1-7c88-7137-8d7d-5ee51024e9b2",
  pageTypeSlug: "temper-skill",
  slug: "renewing-animation",
  title: "Renewing Animation",
  key: "renewing-animation",
  baseName: "Reanimate",
  description:
    '"Bring your allies back from the brink of death, resurrecting up to 3 allies at the target location.\\n\\nYou restore 5300 Magicka and Stamina for each ally you successfully resurrect."',
  icon: "/esoui/art/icons/ability_necromancer_018_a.dds",
  esoSkillId: 40118367,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-living-death",
  skillType: "ultimate",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
