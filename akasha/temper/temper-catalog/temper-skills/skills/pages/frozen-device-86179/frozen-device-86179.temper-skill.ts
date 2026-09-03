import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const frozenDevice86179 = {
  id: "019e6f53-a254-75a5-8b28-822beddd9673",
  pageTypeSlug: "temper-skill",
  slug: "frozen-device-86179",
  title: "Frozen Device",
  key: "frozen-device-86179",
  baseName: "Frozen Gate",
  description:
    '"Summon an ancient portal, which arms after |cffffff1.5|r seconds.\\n\\nWhen triggered the enemy is teleported to you if within range, immobilized for |cffffff3|r seconds, dealt |cffffff6257|r Frost Damage, and afflicted with Major Maim, reducing their damage done by |cffffff10|r% for |cffffff4|r seconds.\\n\\nYou can have up to |cffffff3|r Frozen Devices active at a time."',
  icon: "/esoui/art/icons/ability_warden_005_a.dds",
  esoSkillId: 86179,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
