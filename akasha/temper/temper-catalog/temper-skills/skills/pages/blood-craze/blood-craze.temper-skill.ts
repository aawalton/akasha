import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bloodCraze = {
  id: "01a05fd0-436a-7f02-9da3-4d3016136f52",
  pageTypeSlug: "temper-skill",
  slug: "blood-craze",
  title: "Blood Craze",
  key: "blood-craze",
  baseName: "Twin Slashes",
  description:
    '"Slice an enemy with both weapons to cause deep lacerations, dealing 580 Bleed Damage with each weapon and causing them to bleed for an additional 3470 Bleed Damage over 20 seconds.\\n\\nYou heal for 358 Health anytime this ability deals damage."',
  icon: "/esoui/art/icons/ability_dualwield_001_b.dds",
  esoSkillId: 40687,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
