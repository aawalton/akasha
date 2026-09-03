import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const frozenDevice = {
  id: "019e6245-a68b-7bc2-b2cf-008702f5e7bd",
  pageTypeSlug: "temper-skill",
  slug: "frozen-device",
  title: "Frozen Device",
  key: "frozen-device",
  baseName: "Frozen Gate",
  description:
    '"Summon an ancient portal, which arms after 1.5 seconds.\\n\\nWhen triggered the enemy is teleported to you if within range, immobilized for 3 seconds, dealt 1799 Frost Damage, and afflicted with Major Maim, reducing their damage done by 10% for 4 seconds.\\n\\nYou can have up to 3 Frozen Devices active at a time."',
  icon: "/esoui/art/icons/ability_warden_005_a.dds",
  esoSkillId: 86182,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
