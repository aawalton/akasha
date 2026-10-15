import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const acceleratedGrowth = {
  id: "019e6245-a5e4-7832-a3c2-c33b06f9349a",
  type: "page-type/temper-skill",
  slug: "accelerated-growth",
  title: "Accelerated Growth",
  key: "accelerated-growth",
  baseName: "Accelerated Growth",
  description:
    "When you heal yourself or an ally under 40% Health with a Green Balance ability you gain Major Mending, increasing your healing done by 16% for 4 seconds.",
  icon: "/esoui/art/icons/passive_warden_008.dds",
  esoSkillId: 85883,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 10,
  createdAt: "2026-05-26T03:13:12.164Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = Major Mending (Constant)",
    "<<2>> = 16% (Constant)",
    "<<3>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
