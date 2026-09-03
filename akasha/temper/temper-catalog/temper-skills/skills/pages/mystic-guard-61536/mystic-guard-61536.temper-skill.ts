import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mysticGuard61536 = {
  id: "019e6f53-a4a5-7236-bf4d-95a35bb0c7e9",
  pageTypeSlug: "temper-skill",
  slug: "mystic-guard-61536",
  title: "Mystic Guard",
  key: "mystic-guard-61536",
  baseName: "Guard",
  description:
    '"Create a lifebond between you and an allied player. While bonded, |cffffff30|r% of the damage they take is instead redistributed to you.\\n\\nYou and your bonded ally also gain Minor Vitality, increasing your healing received and damage shield strength by |cffffff6|r%.\\n\\nThe bond will remain until you recast the spell or move more than |cffffff15|r meters away from your ally."',
  icon: "/esoui/art/icons/ability_ava_mystic_guard.dds",
  esoSkillId: 61536,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 1,
  rank: 5,
  skillLineId: "alliance-war-support",
  skillType: "active",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
