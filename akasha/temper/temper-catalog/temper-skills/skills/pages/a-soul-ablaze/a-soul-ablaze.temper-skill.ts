import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const aSoulAblaze = {
  id: "01a05fd0-4339-72a6-8198-de1a40e770f7",
  pageTypeSlug: "temper-skill",
  slug: "a-soul-ablaze",
  title: "A Soul Ablaze",
  key: "a-soul-ablaze",
  baseName: "A Soul Ablaze",
  description:
    '"The will to survive burns bright in your chest.\\n\\nIncreases your Healing Taken by |cffffff4|r%."',
  icon: "/esoui/art/icons/ability_weapon_001.dds",
  esoSkillId: 29451,
  isMorph: false,
  learnedLevel: 39,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 39,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "passive",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill
