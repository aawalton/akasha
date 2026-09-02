import type { TemperSkill } from "../temper-skill.page-type.ts"

export const enchantedForest = {
  id: "01a05fd0-8e1d-70b2-bd09-e4c16d28c1c0",
  pageTypeSlug: "temper-skill",
  slug: "enchanted-forest",
  title: "Enchanted Forest",
  key: "enchanted-forest",
  baseName: "Secluded Grove",
  description:
    '"Swell a healing forest at the target location, instantly healing the most injured friendly target for 2880 Health. The forest continues to heal you and your allies in the area for 958 Health every 1 second for 6 seconds.\\n\\nYou generate 20 Ultimate if the initial heal is used on a friendly target under 50% Health."',
  icon: "/esoui/art/icons/ability_warden_012_a.dds",
  esoSkillId: 93971,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-green-balance",
  skillType: "ultimate",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
