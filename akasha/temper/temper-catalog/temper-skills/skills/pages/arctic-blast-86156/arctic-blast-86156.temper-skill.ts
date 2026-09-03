import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const arcticBlast86156 = {
  id: "019e6f53-9ebc-7fec-8247-51785fc29c29",
  pageTypeSlug: "temper-skill",
  slug: "arctic-blast-86156",
  title: "Arctic Blast",
  key: "arctic-blast-86156",
  baseName: "Arctic Wind",
  description:
    '"Envelop yourself in winter winds, instantly dealing |cffffff6611|r Frost Damage to nearby enemies. If no enemies are hit, you heal for |cffffff7306|r Health.\\n\\nThe winds persist for |cffffff20|r seconds and chill your foes to the bone, dealing |cffffff1041|r Frost Damage every |cffffff2|r seconds, after |cffffff2|r seconds. The damage has a higher chance to apply the Chilled status effect.\\n\\nStuns enemies after the delay for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_warden_003_b.dds",
  esoSkillId: 86156,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
