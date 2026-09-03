import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const reverberatingBash38455 = {
  id: "019e6f53-a644-7bf0-84ad-6dfbdc021180",
  pageTypeSlug: "temper-skill",
  slug: "reverberating-bash-38455",
  title: "Reverberating Bash",
  key: "reverberating-bash-38455",
  baseName: "Power Bash",
  description:
    '"Strike an enemy full-force with your shield, dealing |cffffff4165|r Physical Damage and stunning them for |cffffff3|r seconds.\\n\\nAfter the stun ends, the enemy takes an additional |cffffff4165|r Physical Damage.\\n\\nThis ability\'s damage is considered Bash damage and interrupts the enemy if they are casting."',
  icon: "/esoui/art/icons/ability_1handed_005_b.dds",
  esoSkillId: 38455,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 38,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
