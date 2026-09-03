import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const reverberatingBash = {
  id: "019e6226-010f-7939-8152-83b3cafc20a1",
  pageTypeSlug: "temper-skill",
  slug: "reverberating-bash",
  title: "Reverberating Bash",
  key: "reverberating-bash",
  baseName: "Power Bash",
  description:
    '"Strike an enemy full-force with your shield, dealing 1161 Physical Damage and stunning them for 3 seconds.\\n\\nAfter the stun ends, the enemy takes an additional 1161 Physical Damage.\\n\\nThis ability\'s damage is considered Bash damage and interrupts the enemy if they are casting."',
  icon: "/esoui/art/icons/ability_1handed_005_b.dds",
  esoSkillId: 41448,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
