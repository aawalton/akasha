import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const arcticBlast86156 = {
  id: "019e6f53-9ebc-7fec-8247-51785fc29c29",
  type: "page-type/temper-skill",
  slug: "arctic-blast-86156",
  title: "Arctic Blast",
  key: "arctic-blast-86156",
  baseName: "Arctic Wind",
  description:
    "Envelop yourself in winter winds, instantly dealing |cffffff6611|r Frost Damage to nearby enemies. If no enemies are hit, you heal for |cffffff7306|r Health.\n\nThe winds persist for |cffffff20|r seconds and chill your foes to the bone, dealing |cffffff1041|r Frost Damage every |cffffff2|r seconds, after |cffffff2|r seconds. The damage has a higher chance to apply the Chilled status effect.\n\nStuns enemies after the delay for |cffffff3|r seconds.",
  icon: "/esoui/art/icons/ability_warden_003_b.dds",
  esoSkillId: 86156,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 44,
  createdAt: "2026-05-28T16:03:31.644Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Frost, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.10323 MaxStat + 1.08494 MaxPower - 0.77399 (Ultimate, ratio = 10.51, Heal, SingleTarget, Direct, R2 = 1)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 0.015495 MaxStat + 0.162697 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Frost, AOE, DOT, 2s tick, R2 = 1)",
    "<<5>> = 2 seconds (Constant)",
    "<<6>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
