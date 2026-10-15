import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const arrowBarrage38695 = {
  id: "019e6f53-9ec3-7db6-9d85-d8ff586fdfbc",
  type: "page-type/temper-skill",
  slug: "arrow-barrage-38695",
  title: "Arrow Barrage",
  key: "arrow-barrage-38695",
  baseName: "Volley",
  description:
    "Launch a multitude of arrows into the sky to rain down, dealing |cffffff1605|r Physical Damage to enemies in the target area every |cffffff1|r second for |cffffff8|r seconds, after a |cffffff2|r second delay.",
  icon: "/esoui/art/icons/ability_bow_003_b.dds",
  esoSkillId: 38695,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 49,
  createdAt: "2026-05-28T16:03:31.651Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0200145 MaxStat + 0.209037 MaxPower - 3.10327 (Ultimate, ratio = 10.44, Dmg, Physical, AOE, DOT, 1s tick, R2 = 0.999996)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 8 seconds (Constant)",
  ],
} as const satisfies TemperSkill
