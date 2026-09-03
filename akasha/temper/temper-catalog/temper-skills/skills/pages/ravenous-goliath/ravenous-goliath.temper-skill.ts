import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ravenousGoliath = {
  id: "019e6245-a6fd-7db3-a1dd-6ab6f8333f54",
  pageTypeSlug: "temper-skill",
  slug: "ravenous-goliath",
  title: "Ravenous Goliath",
  key: "ravenous-goliath",
  baseName: "Bone Goliath Transformation",
  description:
    '"Become a horrific Ravenous Goliath, increasing your Max Health by 30000 for 20 seconds and immediately restoring 30000 Health. \\n\\nWhile transformed, your damaging Light Attacks restore 319 Health and your fully-charged Heavy Attacks restore 800 Health. You deal 826 Magic Damage to nearby enemies every second and heal for that amount. These abilities scale off your Max Health."',
  icon: "/esoui/art/icons/ability_necromancer_012_b.dds",
  esoSkillId: 40118279,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "ultimate",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
