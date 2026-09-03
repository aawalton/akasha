import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const piercingMark = {
  id: "019e6245-a6e5-7180-984d-844d3121839c",
  pageTypeSlug: "temper-skill",
  slug: "piercing-mark",
  title: "Piercing Mark",
  key: "piercing-mark",
  baseName: "Mark Target",
  description:
    '"Expose an enemy\'s weaknesses to afflict them with Major Breach, reducing their Physical Resistance and Spell Resistance by 5948 for 1 minute.\\n\\nYou can detect marked enemies even if they use stealth or invisibility for 3 seconds. When a marked enemy dies, you heal to full Health.\\n\\nYou can only have one Piercing Mark active at a time."',
  icon: "/esoui/art/icons/ability_nightblade_014_b.dds",
  esoSkillId: 37631,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
