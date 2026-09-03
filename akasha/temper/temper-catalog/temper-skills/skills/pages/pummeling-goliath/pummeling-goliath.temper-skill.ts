import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const pummelingGoliath = {
  id: "019e6245-a6f4-7515-b359-2be7a3b4d02b",
  pageTypeSlug: "temper-skill",
  slug: "pummeling-goliath",
  title: "Pummeling Goliath",
  key: "pummeling-goliath",
  baseName: "Bone Goliath Transformation",
  description:
    '"Become a destructive Pummeling Goliath, increasing your Max Health by 30000 for 20 seconds and immediately restoring 30000 Health. \\n\\nWhile transformed, your damaging Light Attacks restore 319 Health and your fully-charged Heavy Attacks restore 800 Health. This ability scales off your Max Health. \\n\\nYour Bash attacks can hit multiple targets in front of you and deal 1799 Physical Damage."',
  icon: "/esoui/art/icons/ability_necromancer_012_a.dds",
  esoSkillId: 40118664,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "ultimate",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
