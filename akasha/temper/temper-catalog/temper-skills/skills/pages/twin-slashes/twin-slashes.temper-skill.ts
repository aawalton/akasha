import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const twinSlashes = {
  id: "019e6f53-a86e-735a-b01a-4ca9419ea210",
  pageTypeSlug: "temper-skill",
  slug: "twin-slashes",
  title: "Twin Slashes",
  key: "twin-slashes",
  baseName: "Twin Slashes",
  description:
    '"Slice an enemy with both weapons to cause deep lacerations, dealing |cffffff2017|r Bleed Damage with each weapon and causing them to bleed for an additional |cffffff11420|r Bleed Damage over |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_dualwield_001.dds",
  esoSkillId: 28379,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
