import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bloodForBlood = {
  id: "01a05fd0-436b-7671-8ff8-45f03d7d9e63",
  pageTypeSlug: "temper-skill",
  slug: "blood-for-blood",
  title: "Blood for Blood",
  key: "blood-for-blood",
  baseName: "Eviscerate",
  description:
    '"Rend an enemy, dealing 2323 Magic Damage and applying the Hemorrhaging status effect.\\n\\nDeals up to 75% more damage based on your missing Health.\\n\\nAfter you cast this ability, you cannot be healed by allies for 3 seconds."',
  icon: "/esoui/art/icons/ability_u26_vampire_01_a.dds",
  esoSkillId: 41902,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
