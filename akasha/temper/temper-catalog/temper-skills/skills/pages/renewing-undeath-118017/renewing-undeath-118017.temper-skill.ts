import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const renewingUndeath118017 = {
  id: "019e6f53-a601-716e-9b5c-ff0fe8b04326",
  pageTypeSlug: "temper-skill",
  slug: "renewing-undeath-118017",
  title: "Renewing Undeath",
  key: "renewing-undeath-118017",
  baseName: "Life amid Death",
  description:
    '"Release residual fragments of fallen souls at the target location, healing you and your allies for |cffffff7547|r Health.\\n\\nConsumes a corpse on cast to immediately remove up to |cffffff3|r negative effects and continue to heal you and your allies in the area for |cffffff7540|r Health over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_necromancer_016_a.dds",
  esoSkillId: 118017,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
