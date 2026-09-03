import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const heroicSlash = {
  id: "019e6226-00fa-7ee6-83ff-916e3c19cfe6",
  pageTypeSlug: "temper-skill",
  slug: "heroic-slash",
  title: "Heroic Slash",
  key: "heroic-slash",
  baseName: "Low Slash",
  description:
    '"Surprise an enemy with a deep lunge, dealing 1438 Physical Damage and afflicting them with Minor Maim, reducing their damage done by 5% for 15 seconds. \\n\\nYou gain Minor Heroism, granting you 1 Ultimate every 1.5 seconds for 15 seconds."',
  icon: "/esoui/art/icons/ability_1handed_001_a.dds",
  esoSkillId: 41414,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
