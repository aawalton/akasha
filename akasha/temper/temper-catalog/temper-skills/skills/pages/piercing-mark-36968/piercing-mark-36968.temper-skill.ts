import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const piercingMark36968 = {
  id: "01a05fd1-2e13-70e6-95ab-31328393fb1d",
  pageTypeSlug: "temper-skill",
  slug: "piercing-mark-36968",
  title: "Piercing Mark",
  key: "piercing-mark-36968",
  baseName: "Mark Target",
  description:
    '"Expose an enemy\'s weaknesses by applying Major Breach to them, reducing Physical Resistance and Spell Resistance by |cffffff5948|r for |cffffff20|r seconds.\\n\\nYou can detect marked enemies even if they use stealth or invisibility for |cffffff3|r seconds. When a marked enemy dies, you heal to full Health.\\n\\nYou can only have one Piercing Mark active at a time."',
  icon: "/esoui/art/icons/ability_nightblade_014_b.dds",
  esoSkillId: 36968,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
