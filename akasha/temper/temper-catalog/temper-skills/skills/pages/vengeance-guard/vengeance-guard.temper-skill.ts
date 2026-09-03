import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceGuard = {
  id: "019e6f53-a920-7610-bd82-5954b5a823c2",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-guard",
  title: "Vengeance Guard",
  key: "vengeance-guard",
  baseName: "Vengeance Guard",
  description:
    '"Create a lifebond between you and a group member for |cffffff20|r seconds. While bonded, your ally reduces their damage taken by |cffffff10|r% and increase your damage taken by |cffffff10|r%.\\n\\nThe bond will break if you move more than |cffffff17|r meters away from your target."',
  icon: "/esoui/art/icons/ability_ava_guard.dds",
  esoSkillId: 245055,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-alliance-war-support",
  skillType: "active",
  subcategoryId: "vengeance-alliance-war-support",
} as const satisfies TemperSkill
