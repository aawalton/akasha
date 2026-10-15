import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const antiCavalryCaltrops40255 = {
  id: "019e6f53-9eb6-71eb-8192-28812552a5fe",
  type: "page-type/temper-skill",
  slug: "anti-cavalry-caltrops-40255",
  title: "Anti-Cavalry Caltrops",
  key: "anti-cavalry-caltrops-40255",
  baseName: "Caltrops",
  description:
    "Hurl a ball of caltrops that scatter over the target area, dealing |cffffff978|r Physical Damage every |cffffff1|r second to enemies inside, and reducing their Movement Speed by |cffffff50|r%.\n\nThe caltrops also drain the Mount Stamina of any enemy in the area.",
  icon: "/esoui/art/icons/ability_ava_001_a.dds",
  esoSkillId: 40255,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 6,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 39,
  createdAt: "2026-05-28T16:03:31.638Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.01254 MaxStat + 0.131211 MaxPower - 0.630654 (Ultimate, ratio = 10.46, Dmg, Physical, AOE, DOT, 1s tick, R2 = 0.999981)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 50% (Constant)",
  ],
} as const satisfies TemperSkill
