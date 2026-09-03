import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bloodMist38965 = {
  id: "019e6f53-9f50-771c-aa26-2f5484c434b7",
  pageTypeSlug: "temper-skill",
  slug: "blood-mist-38965",
  title: "Blood Mist",
  key: "blood-mist-38965",
  baseName: "Mist Form",
  description:
    '"Dissolve into a bloody mist, causing the next |cffffff3|r projectiles to deal no damage to you for |cffffff1|r second while you dash forward and reappear at your target location after a short duration.\\n\\nUpon activation you drain the blood of those around you for |cffffff20|r seconds, dealing |cffffff1516|r Magic Damage every |cffffff2|r seconds to enemies and healing you for |cffffff46|r% of the damage caused.\\n\\nCasting again within |cffffff4|r seconds costs |cffffff33|r% more Magicka."',
  icon: "/esoui/art/icons/ability_u26_vampire_05_b.dds",
  esoSkillId: 38965,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 9,
  morphIndex: 2,
  rank: 9,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
