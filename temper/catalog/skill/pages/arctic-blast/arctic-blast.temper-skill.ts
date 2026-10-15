import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const arcticBlast = {
  id: "019e6245-a5ed-70d1-9ff4-0e2fa36de829",
  type: "page-type/temper-skill",
  slug: "arctic-blast",
  title: "Arctic Blast",
  key: "arctic-blast",
  baseName: "Arctic Wind",
  description:
    "Envelop yourself in winter winds, instantly dealing 1799 Frost Damage to nearby enemies. If no enemies are hit, you heal for 2323 Health.\n\nThe winds persist for 20 seconds and chill your foes to the bone, dealing 298 Frost Damage every 2 seconds, after 2 seconds. The damage has a higher chance to apply the Chilled status effect.\n\nStuns enemies after the delay for 3 seconds.",
  icon: "/esoui/art/icons/ability_warden_003_b.dds",
  esoSkillId: 86159,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 43,
  createdAt: "2026-05-26T03:13:12.173Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.080031675 MaxStat + 0.840333104 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Frost, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.10323 MaxStat + 1.08494 MaxPower - 0.77399 (Ultimate, ratio = 10.51, Heal, SingleTarget, Direct, R2 = 1)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 0.016006335 MaxStat + 0.168066001 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Frost, AOE, DOT, 2s tick, R2 = 1)",
    "<<5>> = 2 seconds (Constant)",
    "<<6>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
