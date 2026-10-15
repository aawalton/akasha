import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const antiCavalryCaltrops = {
  id: "019e6251-4c83-71c8-8b2d-ab1c84f380dc",
  type: "page-type/temper-skill",
  slug: "anti-cavalry-caltrops",
  title: "Anti-Cavalry Caltrops",
  key: "anti-cavalry-caltrops",
  baseName: "Caltrops",
  description:
    "Hurl a ball of caltrops that scatter over the target area, dealing 281 Physical Damage every 1 second to enemies inside, and reducing their Movement Speed by 50%.\n\nThe caltrops also drain the Mount Stamina of any enemy in the area.",
  icon: "/esoui/art/icons/ability_ava_001_a.dds",
  esoSkillId: 46420,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 38,
  createdAt: "2026-05-26T03:25:55.715Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.01254 MaxStat + 0.131211 MaxPower - 0.630654 (Ultimate, ratio = 10.46, Dmg, Physical, AOE, DOT, 1s tick, R2 = 0.999981)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 50% (Constant)",
  ],
} as const satisfies TemperSkill
