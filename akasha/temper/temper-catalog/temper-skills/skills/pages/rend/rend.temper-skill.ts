import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const rend = {
  id: "019e6226-010c-7531-90ff-eadbdd8ebe2c",
  pageTypeSlug: "temper-skill",
  slug: "rend",
  title: "Rend",
  key: "rend",
  baseName: "Lacerate",
  description:
    '"Slash enemies in front of you, causing them to bleed for 12942 Bleed Damage over 16 seconds and healing you for 50% of the damage done.\\n\\nEach tick applies the Hemorrhaging status effect."',
  icon: "/esoui/art/icons/ability_dualwield_006_a.dds",
  esoSkillId: 86393,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-dual-wield",
  skillType: "ultimate",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
