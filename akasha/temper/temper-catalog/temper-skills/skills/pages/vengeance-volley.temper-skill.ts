import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceVolley = {
  id: "01a05fd2-1e8f-7a79-9fa0-8c7b28156fdb",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-volley",
  title: "Vengeance Volley",
  key: "vengeance-volley",
  baseName: "Vengeance Volley",
  description:
    '"Launch a multitude of arrows into the sky to rain down, dealing |cffffff11760|r Physical Damage to up to 3 enemies in the target area after a |cffffff2|r second delay."',
  icon: "/esoui/art/icons/ability_bow_003.dds",
  esoSkillId: 241258,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-bow",
  skillType: "active",
  subcategoryId: "vengeance-weapon-bow",
} as const satisfies TemperSkill
